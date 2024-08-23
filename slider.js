$(document).ready(function() {
    "use strict";
    const $sliderContainer = $(".Slider-Container"),
          $sliderImages = $sliderContainer.find("img, iframe"),
          $nextButton = $("#nextButton"),
          $prevButton = $("#prevButton"),
          $slidersNumberElement = $("#slidersNumberElement"),
          $sliderHeader = $("#sliderHeader"),
          $paginationParent = $("<div>", {
              id: "paginationParent",
              class: "container-MultipleImages"
          }).appendTo(".MultipleImages");
    let currentSlide = 1,
        previousSlideIndex = 0;

    // إنشاء عناصر التصفح
    $sliderImages.each(function(index) {
        const src = $(this).is("img") ? $(this).attr("src") : $(this).attr("src"),
              altText = $(this).attr("alt"),
              $paginationItem = $("<div>", {
                  class: "container-MultipleImages-parent",
                  "data-index": index + 1
              }),
              $img = $(this).is("img") ? $("<img>", { src: src, alt: altText }) : $("<iframe>", { src: src, frameborder: "0", allowfullscreen: "true" }),
              $shadow = $("<div>", { class: "img-Shadow-projects-page" }),
              $shadowText = $("<div>", {
                  class: "Text-Shadow p-0 pb-1",
                  html: $("<div>", {
                      class: "Real-Text-projects-page text-center",
                      html: $("<span>", {
                          class: "img-Text-projects-page",
                          text: altText
                      })
                  })
              }),
              $counter = $("<div>", {
                  class: "container-MultipleImages-parent-slider-count",
                  text: "#" + (index + 1)
              });
        $paginationItem.append($img, $shadow.append($shadowText), $counter).appendTo($paginationParent);
    });

    function stopVideo($slide) {
        if ($slide.is("iframe")) {
            $slide.attr('src', $slide.attr('src').replace('&autoplay=1', '').replace('?autoplay=1', ''));
        }
    }

    function updateSlider() {
        const $prevSlide = $sliderImages.eq(previousSlideIndex);
        const $currentSlide = $sliderImages.eq(currentSlide - 1);

        // إيقاف الفيديو السابق
        stopVideo($prevSlide);

        // تحسين الانتقال باستخدام تأثير التلاشي
        $currentSlide.fadeIn(0, function() {
            $('.selected').removeClass('selected');
            $(this).addClass("selected")

            // تشغيل الفيديو تلقائيًا إذا كانت الشريحة الحالية إطارًا
            if ($currentSlide.is("iframe")) {
                const src = $currentSlide.attr("src");
                $currentSlide.attr("src", src.includes("?") ? src + "&autoplay=1" : src + "?autoplay=1");
            }
        });

        $paginationParent.children().removeClass("active").eq(currentSlide - 1).addClass("active");
        $prevButton.toggleClass("disabledButton", currentSlide === 1);
        $nextButton.toggleClass("disabledButton", currentSlide === $sliderImages.length);
        $slidersNumberElement.text(currentSlide + "/" + $sliderImages.length);
        $sliderHeader.text($currentSlide.attr("alt"));

        // تحديث نص الظل مع النص البديل الحالي
        $currentSlide.closest('.container-MultipleImages-parent').find('.img-Text-projects-page').text($currentSlide.attr("alt"));

        previousSlideIndex = currentSlide - 1;
    }

    $nextButton.click(function() {
        if (currentSlide < $sliderImages.length) {
            currentSlide++;
            updateSlider();
        }
    });

    $prevButton.click(function() {
        if (currentSlide > 1) {
            currentSlide--;
            updateSlider();
        }
    });

    $paginationParent.children().click(function() {
        currentSlide = $(this).data("index");
        updateSlider();
    });

    // تهيئة العرض الشرائحي
    updateSlider();
});
