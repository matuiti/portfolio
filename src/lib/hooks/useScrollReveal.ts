"use client"; // クライアント側（ブラウザ）だけで動かしてね

import { useEffect, useCallback, useRef } from "react";
import gsap from "gsap";
import { useUIStore } from "@/store/useUIStore";

export const useScrollReveal = () => {
  // 1. サイト全体の「今どのフェーズか（MV中か、準備完了か）」を取得
  const phase = useUIStore((state) => state.phase);

  // 2. 監視カメラ（IntersectionObserver）の「本体」をしまっておく箱
  const observerRef = useRef<IntersectionObserver | null>(null);

  /**
   * 🎬 【演出関数】要素をじわっと出現させる
   */
  const revealElement = useCallback((el: Element) => {
    // もしすでに「表示済み」というシール（dataset）が貼ってあったら、二度手間なので何もしない
    if ((el as HTMLElement).dataset.revealed === "true") return;

    // GSAPでアニメーション開始
    gsap.to(el, {
      autoAlpha: 1, // 透明度1にして、かつ見える状態にする
      y: 0, // 3rem 下がっていたのを元の位置に戻す
      duration: 1.2, // 1.2秒かけてじわっと
      ease: "power3.out", // 終わりにかけて滑らかに減速
      overwrite: true, // 他のアニメーションが割り込んできたら、こっちを優先して上書き

      // アニメーションが終わった後の処理
      onComplete: () => {
        // 【重要】GSAPが勝手に付けた「インラインスタイル（直接書き込まれた数値）」を消去
        // これをしないと、CSSの :hover アクションが効かなくなる
        gsap.set(el, { clearProps: "opacity,visibility,transform" });

        // スタイルを消したままだと消えてしまうので、最低限の「見える状態」をセット
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.visibility = "visible";

        // 「この要素はもう演出済みだよ」というシールを貼る
        (el as HTMLElement).dataset.revealed = "true";
      },
    });
  }, []);

  /**
   * 🔍 【スキャン関数】新しく現れた要素を見つけて、監視対象に入れる
   */
  const observeNewElements = useCallback(() => {
    // 画面内の「ふわっとさせたい要素」を全部探す
    const targets = document.querySelectorAll(".js-fuwa-fade");

    targets.forEach((target) => {
      // すでに表示済みのシールがあるなら無視
      if ((target as HTMLElement).dataset.revealed === "true") return;

      // その要素が今、画面に対してどの位置にいるか計算
      const rect = target.getBoundingClientRect();

      // 【リロード対策】すでに画面内（上端が画面の下端より上）にいるなら即座に表示
      if (rect.top < window.innerHeight) {
        revealElement(target);
      }
      // まだ画面の外（下）にいるなら、監視カメラ（Observer）に登録して待つ
      else if (observerRef.current) {
        observerRef.current.observe(target);
      }
    });
  }, [revealElement]);

  /**
   * 🚀 【メイン実行部】サイトの状態が変わるたびに監視の網を張る
   */
  useEffect(() => {
    // 最初からスクロールされているかチェック（リロード時など）
    const isScrolled = window.scrollY > 100;

    // 「すでに下にいる」または「MVが終わった（ready）」とき以外は、何もしない
    if (!isScrolled && phase !== "ready") return;

    // 1. 監視カメラの「ルール」を決める
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 要素が画面にひょこっと入ってきたら（交差したら）
          if (entry.isIntersecting) {
            revealElement(entry.target); // 演出開始！
            observerRef.current?.unobserve(entry.target); // 一度見たら監視を外す（エコ）
          }
        });
      },
      // rootMargin: 下端から「-50px」の位置に来たら発火（少し早めに準備）
      { rootMargin: "0px 0px -50px 0px" },
    );

    // 2. 最初に見えている範囲をスキャン
    observeNewElements();

    // 3. ページの中身が変わる（タブ切り替え等）のを監視する「番犬（MutationObserver）」
    let timer: NodeJS.Timeout;
    const mutationObserver = new MutationObserver(() => {
      // DOMが変わった直後に何度もスキャンすると重いので、100ms待ってから1回だけ実行（デバウンス）
      clearTimeout(timer);
      timer = setTimeout(() => {
        observeNewElements();
      }, 100);
    });

    // ページ全体の変化を監視開始
    mutationObserver.observe(document.body, {
      childList: true, // 子要素が増えたり減ったりしたか
      subtree: true, // 深い階層まで見るか
    });

    // クリーンアップ：このフックが不要になったら、全部の監視を止めてメモリを解放する
    return () => {
      observerRef.current?.disconnect();
      mutationObserver.disconnect();
      clearTimeout(timer);
    };
  }, [phase, revealElement, observeNewElements]);
};
