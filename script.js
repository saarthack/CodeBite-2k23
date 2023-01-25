(function () {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

  document.querySelector("#about").addEventListener("click", function () {
    locoScroll.scrollTo(300,300)
  });
  document.querySelector("#knowmore").addEventListener("click", function () {
    locoScroll.scrollTo(1230,1230)
  });
  document.querySelector("#awards").addEventListener("click", function () {
    locoScroll.scrollTo(1770,1770)
  });
  document.querySelector("#nav button").addEventListener("click", function () {
    locoScroll.scrollTo(2135,2130)
  });
})();

const random_char = () => {
  const possible =
    "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" +
    "0123456789" +
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "abcdefghijklmnopqrstuvwxyz";
  return possible.charAt(Math.floor(Math.random() * possible.length));
};

console.log(random_char());
const mask = (chars, progress) => {
  const masked = [];

  for (let i = 0; i < chars.length; i++) {
    const position = (i + 1) / chars.length;
    if (position > progress) {
      masked.push(random_char());
    } else {
      masked.push(chars[i]);
    }
  }

  return masked.join("");
};

const shuffle = (el) => {
  const chars = el.textContent.split("");

  const params = {
    progress: 0,
  };

  const a = anime({
    targets: params,
    progress: 1,
    delay: 1000,
    duration: 1500,
    easing: "easeOutQuad",
    update: () => {
      el.textContent = mask(chars, params.progress);
    },
    complete: () => {
      el.classList.add("completed");
    },
  });

  el.onclick = () => {
    el.classList.remove("completed");
    a.restart();
  };
};

const shuffle2 = (el) => {
  const chars = el.textContent.split("");

  const params = {
    progress: 0,
  };

  const a = anime({
    targets: params,
    progress: 1,
    delay: 2000,
    duration: 1000,
    easing: "easeOutQuad",
    update: () => {
      el.textContent = mask(chars, params.progress);
    },
    complete: () => {
      el.classList.add("completed");
    },
  });

  el.onclick = () => {
    el.classList.remove("completed");
    a.restart();
  };
};

shuffle(document.querySelector("#eventname"));
shuffle2(document.querySelector("#eventdate"));
// shuffle2(document.querySelector("#eventname-p"));

var images = document.querySelectorAll("#options img");
images.forEach(function (elem) {
  gsap.to(elem, {
    scrollTrigger: {
      trigger: "#options",
      scroller: "#main",
      // markers:true,
      scrub: 2,
    },
    x: -700,
  });
});

gsap.to("#page3>img", {
  rotate: "40deg",
  scrollTrigger: {
    trigger: "#page3>img",
    scroller: "#main",
    scrub: 2,
    // markers:true
  },
});
gsap.to("#nav", {
  backgroundColor: "#FAFAFA",
  duration: 0.1,
  scrollTrigger: {
    trigger: "#page1 h1",
    scroller: "#main",
    // markers:true,
    start: "top 2%",
    end: "top 2%",
    scrub: true,
  },
});
