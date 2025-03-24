$(document).ready(function() {
  /** Mobile Nav Toggle */
  $('.header-links-wrapper .mobile-burger').on('click', function() {
    $('.icon-hamburger').toggleClass('hidden');
    $('.icon-close').toggleClass('hidden');
    $('.header-mobile-dropdown').slideToggle();
  });

  /** Slider Sections */
  $('.testimonial-swiper-wrapper-virtual').on('init', function(event, slick) {
    var swiperHeight = $(this).height();
    $('.testimonial-swiper-wrapper').css('min-height', swiperHeight);
  });

  $('div[class*="testimonial-swiper-wrapper"], .highlight-swiper-wrapper').slick({
    centerMode: true,
    centerPadding: '14%',
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: false,
    dots: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnFocus: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1441,
        settings: {
          centerPadding: '5%',
        }
      },
      {
        breakpoint: 1025,
        settings: {
          centerPadding: '0%',
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          centerPadding: '26%',
        }
      },
      {
        breakpoint: 648,
        settings: {
          slidesToShow: 1,
          centerPadding: '14%',
        }
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          centerPadding: '2%',
        }
      },
    ]
  });

  /** Accordiion */
  $('.accordions .accordion-heading').on('click', function(e) {
    $this = $(this);
    $target =  $this.next('.accordion-content');

    if ( !$this.hasClass('active') ){
      $this.parents('.accordions').find('.accordion-heading').removeClass('active');
      $this.parents('.accordions').find('.accordion-content').slideUp();
      // $('.accordions .accordion-heading').removeClass('active');
      // $('.accordions .accordion-content').slideUp();
      $this.addClass('active');
      $target.slideDown();
    } else {
      $this.removeClass('active');
      $target.slideUp();
    }
    
    return false;
  });

  /** Anchor Group Links */
  var offsetHeight = $('header.header-wrapper').height() + $('.anchor-group-wrapper').outerHeight();

  $(window).scroll(function () {
    var fromTop = $(window).scrollTop() + offsetHeight;
    
    $('.anchor-group-wrapper a').each(function() {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      
      if (refElement.position().top <= fromTop + 1 && refElement.position().top + refElement.outerHeight() > fromTop) {
        $('.anchor-group-wrapper a button').removeClass("active");
        currLink.find('button').addClass("active");
      } else {
        currLink.removeClass("active");
      }
    });
  });

  $(".anchor-group-wrapper a").click(function(event) {
    event.preventDefault();
    
    $("html, body").animate({
      scrollTop: $($(this).attr("href")).offset().top - offsetHeight
    }, 500);
  });

  /** Login Trigger */
  $('.recover-password').on('click', function(e) {
    e.preventDefault();

    $('#CustomerLoginForm').addClass('hidden');
    $('#RecoverPasswordForm').removeClass('hidden');
  });

  $('.return-login').on('click', function(e) {
    e.preventDefault();

    $('#CustomerLoginForm').removeClass('hidden');
    $('#RecoverPasswordForm').addClass('hidden');
  });

  /** Meal Popup */
  $('.product-meal-item .meal-popup-action').on('click', function() {
    var $this = $(this);
    $this.parents('.product-meal-item').find('.meal-popup-box').addClass('show');
    $('body').addClass('overflow-y-hidden');
  });

  $('.meal-popup-box .close-popup').on('click', function() {
    var $this = $(this);
    $this.parents('.meal-popup-box').removeClass('show');
    $('body').removeClass('overflow-y-hidden');
  });

  /** Extra Popup */
  $(document).on('click', '.js-extra-btn', function() {
    $('.extra-meal-selection').addClass('show');
    $('body').addClass('overflow-y-hidden--extra');
  });
  $('.extra-meal-selection .close-popup--extra').on('click', function() {
    $('.extra-meal-selection').removeClass('show');
    $('body').removeClass('overflow-y-hidden--extra');
    $('.plan-checkout-btn').removeClass('js-extra-btn');
    $('.plan-checkout-btn').addClass('js-checkout-btn');
  });

  /** Meal Qty Plan */
  var limitQty = $('.total-meals-limit');
  var limitPrice = $('.total-meals-price');
  var currentQty = $('.current-meals-qty');
  var extraQty = $('.extra-meals-qty');
  var planDay = $('#meal-plan-day');
  var planStep = $('#meal-plan-step');
  var cartParams = [];

  $('.qty-selection-inner .plan-qty-item').on('click', function() {
    var $this = $(this);
    
    limitQty.val( parseInt($this.attr('data-title')) ).trigger("change");
    limitPrice.val( parseInt($this.attr('data-price')) ).trigger("change");
    planStep.val(2).trigger("change");

    $('.qty-selection-inner .plan-qty-item').removeClass('active');
    $this.addClass('active');
    $('.product-plan.day-select-plan').removeClass('pointer-events-none');
  });

  /** Meal Day Plan */
  $('.day-selectbox-wrap .plan-day-item').on('click', function() {
    var $this = $(this);

    planDay.val($this.data('day')).trigger('change');

    if ( parseInt(planStep.val()) < 2 ) {
      planStep.val(2).trigger("change");
    }
    $('.day-selectbox-wrap .plan-day-item').removeClass('active');
    $this.addClass('active');
    $('.product-meals.meals-selection').removeClass('pointer-events-none');
  });

  /** Meal Qty Control */
  $('.product-meal-item .add-cart-btn').on('click', function() {
    var $this = $(this);
    var mealQty = $this.parents('.product-meal-item').find('.meal-qty');

    mealQty.val(1).trigger("change");
    $this.removeClass('active');
    $this.next().addClass('active');

    if ( $this.parents('.product-meal-item').hasClass('extra-meal') ) {
      extraQty.val(parseInt(extraQty.val()) + 1).trigger("change");
    } else {
      currentQty.val(parseInt(currentQty.val()) + 1).trigger("change");
    }
  });

  $('.product-meal-item .qty-selection-wrap .qty-minus').on('click', function(e) {
    if ($(this).parents('.product-meal-item').hasClass('rc-upsell')) {
      return;
    }
    var mealQty = $(this).parents('.product-meal-item').find('.meal-qty');
    var qtyVal = mealQty.val();

    if (qtyVal > 0) {
      mealQty.val(parseInt(qtyVal) - 1).trigger("change"); 

      if ( $(this).parents('.product-meal-item').hasClass('extra-meal') ) {
        extraQty.val(parseInt(extraQty.val()) - 1).trigger("change");
      } else {
        currentQty.val(parseInt(currentQty.val()) - 1).trigger("change");
      }

      if (qtyVal == 1) {
        $(this).parent().removeClass('active');
        $(this).parent().prev().addClass('active');
      } else {
        $(this).parent().find('.value').val(parseInt(qtyVal) - 1);
      }
    }
  });

  $('.product-meal-item .qty-selection-wrap .qty-plus').on('click', function() {
    if ($(this).parents('.product-meal-item').hasClass('rc-upsell')) {
      return;
    }
    var mealQty = $(this).parents('.product-meal-item').find('.meal-qty');
    var qtyVal = mealQty.val();

    mealQty.val(parseInt(qtyVal) + 1).trigger("change"); 
    
    if ( $(this).parents('.product-meal-item').hasClass('extra-meal') ) {
      extraQty.val(parseInt(extraQty.val()) + 1).trigger("change");
    } else {
      currentQty.val(parseInt(currentQty.val()) + 1).trigger("change");
    }

    $(this).parent().find('.value').val(parseInt(qtyVal) + 1);
  });

  $('.product-meal-item .qty-selection-wrap .value').on('change', function() {
    if ($(this).parents('.product-meal-item').hasClass('rc-upsell')) {
      return;
    }
    var mealQty = $(this).parents('.product-meal-item').find('.meal-qty');
    var qtyVal = mealQty.val();
    let thisQty = 0;
    if ($(this).val()) {
      thisQty = parseInt($(this).val());
    }
    else {
      $(this).val(0);
    }

    mealQty.val(thisQty).trigger("change"); 

    let extraQtyValue = 0, currentQtyValue = 0;
    $('.main-meal-selection .product-meal-item').each(function () {
      let itemQty = parseInt($(this).find('.meal-qty').val());
      currentQtyValue += itemQty;
    });
    $('.extra-meal-selection .product-meal-item').each(function () {
      let itemQty = parseInt($(this).find('.meal-qty').val());
      extraQtyValue += itemQty;
    });
    
    if ( $(this).parents('.product-meal-item').hasClass('extra-meal') ) {
      extraQty.val(extraQtyValue).trigger("change");
    } else {
      currentQty.val(currentQtyValue).trigger("change");
    }
  });

  /** Weekly Menu Tab **/
  
  $(".weekly-meals-date-tab").on("click", function () {
    $(".weekly-meals-date-tab").removeClass("active");
    $(this).addClass("active");
    $(".main-meal-selection .meals-grid-wrap").hide();
    $("#weekly-meals-selection-"+$(this).data("idx")).show();
  });
  
  /** Order Summary */
  var summaryLimitQty = $('.meals-selection .summary-head .limit-qty');
  var summaryCurrQty = $('.meals-selection .summary-head .current-qty');
  var summaryExtraQty = $('.meals-selection .summary-head .extra-meal-qty');

  // Initiallize
  summaryLimitQty.text(limitQty.val());
  $('.order-summary .summary-description .add-more-desc .value').text(parseInt(limitQty.val()) - parseInt(currentQty.val()));

  var amountCalculation = () => {
    if (parseInt(currentQty.val()) >= 1) {
      planStep.val(2).trigger("change");

      if ($('.rc-update-fuel').length) {
        $('.rc-update-fuel').prop('disabled', false);
      }

      $('.plan-checkout-btn').attr("disabled", false);
    } else {
      $('.plan-checkout-btn').attr("disabled", true);
    }
  }

  amountCalculation();

  // Changing
  limitQty.change(function() {
    summaryLimitQty.text($(this).val());
    amountCalculation();
  });

  summaryCurrQty.text(currentQty.val());
  currentQty.change(function() {
    summaryCurrQty.text($(this).val());

    var totalPriceCalc = 0.0;
    $('.product-meal-item').each(function() {
      var $this = $(this);
      var price = $this.find('.meal-qty').attr('data-price');
      var qty = $this.find('.meal-qty').val();

      totalPriceCalc = totalPriceCalc + (parseFloat(price) * parseFloat(qty));
    });

    $('.order-checkout .checkout-info .value').text(totalPriceCalc.toFixed(2));

    amountCalculation();
  });

  summaryExtraQty.text(extraQty.val());
  extraQty.change(function() {
    summaryExtraQty.text($(this).val());

    var totalPriceCalc = 0.0;
    $('.product-meal-item').each(function() {
      var $this = $(this);
      var price = $this.find('.meal-qty').attr('data-price');
      var qty = $this.find('.meal-qty').val();

      totalPriceCalc = totalPriceCalc + (parseFloat(price) * parseFloat(qty));
    });

    $('.order-checkout .checkout-info .value').text(totalPriceCalc.toFixed(2));
  })

  // Added Meals Trigger
  $('.product-meal-item .meal-qty').each(function() {
    var $this = $(this);

    var mealQtyCtrler = () => {
      var addedMeal = $this;
      var itemWrap = addedMeal.parent('.product-meal-item');
      var mealProductID = addedMeal.attr('data-product-id');
      var mealVariantID = addedMeal.attr('id');
      var mealTitle = addedMeal.attr('data-title');
      var mealPrice = addedMeal.attr('data-price');
      var qtySelection = $('.added-detail-summary .qty-ctrl-clone .qty-selection-wrap').clone();

      if ( itemWrap.hasClass('extra-meal') ) qtySelection.addClass('extra-meal-qty');

      if ( addedMeal.val() > 0 ) {
        var mealItem = $('.added-detail-summary .detail-lists > div[id*="' + mealProductID + '"]');
        var title = $('<p class="meal-title bold">' + mealTitle + '</p>');
        var price = $('<span class="meal-price">£' + mealPrice + '</span>');
        var priceQtyWrap = $('<dive class="price-qty-wrap"></dive>');
        priceQtyWrap.append(qtySelection);
        priceQtyWrap.append(price);
        priceQtyWrap.find('.qty-selection-wrap .value').val(addedMeal.val());
        var newMealList = $('<div id="' + mealProductID + '-meal" class="meal-item"></div>');

        newMealList.append(title);
        newMealList.append(priceQtyWrap);

        if ( mealItem.length > 0 ) {
          mealItem.find('.qty-selection-wrap .value').val(addedMeal.val());
        } else {
          $('.added-detail-summary .detail-lists').append(newMealList);
        }

        if (cartParams.some(item => item.product_id === mealProductID)) {
          cartParams.map(param => {
            if ( param.product_id ==  mealProductID) {
              param.quantity = addedMeal.val();
              param.id = mealVariantID;
            }
          });
        } else {
          cartParams.push({
            product_id: mealProductID,
            id: mealVariantID,
            quantity: addedMeal.val()
          });
        }
      } else {
        $('#' + mealProductID + '-meal').remove();

        cartParams = $.grep(cartParams, function(e){ 
          return e.product_id != mealProductID; 
        });
      }
    }

    mealQtyCtrler();
    $this.change(function() {
      mealQtyCtrler();
    });
  });

  $(document).on('click', '.added-detail-summary .meal-item .qty-selection-wrap .qty-minus', function() {
    var $this = $(this);
    var productID = $this.parents('.meal-item').attr('id').replace('-meal', '');
    
    $('input[data-product-id="' + productID + '"]').parent('.product-meal-item').find('.qty-minus').click();
  });

  $(document).on('click', '.added-detail-summary .meal-item .qty-selection-wrap .qty-plus', function() {
    var $this = $(this);
    var productID = $this.parents('.meal-item').attr('id').replace('-meal', '');
    
    $('input[data-product-id="' + productID + '"]').parent('.product-meal-item').find('.qty-plus').click();
  });

  $(document).on('change', '.added-detail-summary .meal-item .qty-selection-wrap .value', function() {
    var $this = $(this);
    var productID = $this.parents('.meal-item').attr('id').replace('-meal', '');
    
    $('input[data-product-id="' + productID + '"]').parent('.product-meal-item').find('.value').val($(this).val()).change();
  });

  /** Plan Steps */
  // $('.order-checkout .checkout-info .value').text(limitPrice.val());
  limitPrice.change(function() {
    if (parseInt(extraQty.val()) > 0) {
      var extraPriceCalc = 0;
      $('.product-meal-item.extra-meal').each(function() {
        var $this = $(this);
        var price = $this.find('.meal-qty').attr('data-price');
        var qty = $this.find('.meal-qty').val();

        extraPriceCalc = extraPriceCalc + (parseInt(price) * parseInt(qty));
      });

      var totalPrice = parseInt(limitPrice.val()) + extraPriceCalc;

      $('.order-checkout .checkout-info .value').text(totalPrice);
    } else {
      $('.order-checkout .checkout-info .value').text(limitPrice.val());
    }
  });

  planDay.change(function() {
    $('.order-checkout .checkout-info .fuel-plan-price .desc').text('P&P £4.95');
  });

  planStep.change(function() {
    $('.order-steps .step').each(function() {
      var $this = $(this);

      if ( parseInt(planStep.val()) < 2 && $('.order-steps .meals-step').hasClass('current-step') ) return;

      $this.removeClass('before-step current-step passed-step');
      if ( parseInt(planStep.val()) == $this.data('step') ) $this.addClass('current-step');
      if ( parseInt(planStep.val()) > $this.data('step') ) $this.addClass('passed-step');
      if ( parseInt(planStep.val()) < $this.data('step') ) $this.addClass('before-step');

      if ( planStep.val() == 2 ) {
        $('.order-checkout .checkout-info').removeClass('hidden');
      }
    });
  });

  /** Mobile Summary Popup */
  $('.mobile-summary-nav').on('click', function() {
    $('.meals-selection .order-summary').addClass('show');
  });

  $('.mobile-close-summary').on('click', function() {
    $('.meals-selection .order-summary').removeClass('show');
  })

  /** Meal Type Filtering */
  $('.meal-filter-wrap .type-filter-btn').on('click', function() {
    var $this = $(this),
        selectedType = $this.data('type');


    $('.meal-filter-wrap .type-filter-btn').removeClass('active');
    $this.addClass('active');
    
    $('.main-meal-selection .meals-grid-wrap .product-meal-item').removeClass('hide');

    if ( selectedType != 'All' ) {
      $('.main-meal-selection .meals-grid-wrap .product-meal-item[data-type!="' + selectedType + '"]').addClass('hide');
    }
  });

  /** Meal Tag Filtering */
  $('.meal-filter-wrap .tags-filter').on('click', function() {
    $('.meal-filter-tags').addClass('show');
    $('body').addClass('overflow-y-hidden');
  });

  $('.meal-filter-tags .filter-heading .close-filter').on('click', function() {
    $('.meal-filter-tags').removeClass('show');
    $('body').removeClass('overflow-y-hidden');
  });

  $('.meal-filter-tags .tag-filter-btn').on('click', function() {
    var $this = $(this);
    
    
    var tagFilterString = [];

    if ( $this.hasClass('clicked') ) {
      $this.removeClass('clicked');
    } else {
      $this.parents('.filter-group-item').find('.tag-filter-btn').removeClass('clicked');
      $this.addClass('clicked');
    }

    $('.meal-filter-tags .tag-filter-btn').each(function() {
      var $this = $(this);

      if ( $this.hasClass('clicked') ) {
        tagFilterString.push($this.data('tag'));
      } else {
        tagFilterString = $.grep(tagFilterString, function(value) {
          return value != $this.data('tag');
        });
      }

      $('.main-meal-selection .meals-grid-wrap .product-meal-item').removeClass('hide');

      if ( tagFilterString.length > 0 ) {
        $('.main-meal-selection .meals-grid-wrap .product-meal-item').each(function() {
          var $this = $(this);
          var mealTags = $this.data('tags');
          let hasAllElems = true;

          for (let i = 0; i < tagFilterString.length; i++) {
            if ( !mealTags.includes(tagFilterString[i]) ) {
              hasAllElems = false;
              break;
            }
          }
    
          if ( hasAllElems ) {
            $this.removeClass('hide');
          } else {
            $this.addClass('hide');
          }
        });
      }
    });
  })

  /** Chef's Selection */
  $('.meal-chef-selection').on('click', function() {
    var selectionNum = limitQty.val();
    
    if ($('[data-tag="gluten free"]').hasClass('clicked')) {
      $('.meals-grid-wrap .product-meal-item').each(function() {
        var $this = $(this);

        if ( chef_collection_gluten.includes($this.data('product-id')) ) {
          $this.attr('data-chef', true);
        } else {
          $this.removeAttr('data-chef');
        }
      });
    } else if ($('[data-tag="dairy free"]').hasClass('clicked')) {
      $('.meals-grid-wrap .product-meal-item').each(function() {
        var $this = $(this);
        
        if ( chef_collection_dairy.includes($this.data('product-id')) ) {
          $this.attr('data-chef', true);
        } else {
          $this.removeAttr('data-chef');
        }
      });
    } else if ($('[data-tag="meat free"]').hasClass('clicked')) {
      $('.meals-grid-wrap .product-meal-item').each(function() {
        var $this = $(this);
        
        if ( chef_collection_meat.includes($this.data('product-id')) ) {
          $this.attr('data-chef', true);
        } else {
          $this.removeAttr('data-chef');
        }
      });
    } else {
      $('.meals-grid-wrap .product-meal-item').each(function() {
        var $this = $(this);
        
        if ( chef_collection_all.includes($this.data('product-id')) ) {
          $this.attr('data-chef', true);
        } else {
          $this.removeAttr('data-chef');
        }
      });
    }
    
    var chefProducts = $('.product-meal-item[data-chef=true]');

    if ( chefProducts.length == 0 ) return;

    if ( chefProducts.length > selectionNum ) {
      chefProducts.each(function(index) {
        var $this = $(this);
        $this.find('.meal-add-cart .add-cart-btn').click();

        return index < selectionNum- 1;
      });
    } else {
      var leftCount = selectionNum - chefProducts.length;
      var remainder = leftCount % chefProducts.length;

      chefProducts.each(function() {
        var $this = $(this);
        $this.find('.meal-add-cart .add-cart-btn').click();
      });
      
      for (let i = 0; i < Math.floor(leftCount / chefProducts.length); i++) {
        chefProducts.each(function() {
          var $this = $(this);
          $this.find('.meal-add-cart .qty-selection-wrap .qty-plus').click();
        });
      }

      if ( remainder > 0 ) {
        chefProducts.each(function(index) {
          var $this = $(this);
          $this.find('.meal-add-cart .qty-selection-wrap .qty-plus').click();

          return index < remainder - 1;
        });
      }
    }
  });

  /** Checkout */
  $(document).on('click', '.js-checkout-btn', function() {
    console.log('� ~ file: theme.js [597] ~ cartParams =>', cartParams);

    let queryParams = cartParams;
    let reversedParams = [];
    let day = $('#meal-plan-day').val();
    let date = $('#meal-plan-day').attr('data-date');
    let dateText = $('#meal-plan-day').attr('data-date-text');
    let preference = "All";

    for (let i = queryParams.length - 1; i >= 0; i --) {
      reversedParams.push(queryParams[i]);
    }

    if ($('.filter-group-item--preference .tag-filter-btn.clicked').length) {
      preference = $('.filter-group-item--preference .tag-filter-btn.clicked.tag-name').text();
    }

    if (day == 'Tue') {
      reversedParams.push(window.fb_tue[0]);
    }

    else if (day == 'Wed') {
      reversedParams.push(window.fb_wed[0]);
    }

    else if (day == 'Thu') {
      reversedParams.push(window.fb_thu[0]);
    }

    else if (day == 'Fri') {
      reversedParams.push(window.fb_fri[0]);
    }

    else if (day == 'Sat') {
      reversedParams.push(window.fb_sat[0]);
    }

    else if (day == 'Sun') {
      reversedParams.push(window.fb_sun[0]);
    }

    if ($('[data-tag="gluten free"]').hasClass('clicked')) {
      preference = "Gluten Free";
    } else if ($('[data-tag="dairy free"]').hasClass('clicked')) {
      preference = "Dairy Free";
    } else if ($('[data-tag="meat free"]').hasClass('clicked')) {
      preference = "Meat Free";
    }

    $.ajax({ // Clear Cart
      type: 'POST',
      url: '/cart/clear.js',
      dataType: 'json',
      beforeSend: function () {
        $('#loader').removeClass('hidden');
      },
      success: function() {
        $.ajax({ // Add items to Cart
          type: 'POST',
          url: '/cart/add.js',
          data: {
            items: reversedParams
          },
          dataType: 'json',
          success: function() {
            $.ajax({ // Attach Date, Preference
              type: 'POST',
              url: '/cart/update.js',
              data: {
                attributes: {
                  'Delivery Date': date,
                  'Preference': preference,
                  'First Delivery': date,
                  'Delivery Date Text': dateText
                }
              },
              dataType: 'json',
              success: function() {
                window.location.href = '/checkout';
              }
            });
          }
        });
      }
    });
  });

  $('.extra-meal-selection').on('click', function(e) {
    if ( !$(e.target).is(".extra-meal-selection-inner, .extra-meal-selection-inner *") ) {
      $('.extra-meal-selection .close-popup').click();
    }
  });

  /** Checkout Reminder */
  if ( window.checkout_reminder ) {
    planStep.val(2).trigger('change');
    $('.order-checkout .checkout-info').removeClass('hidden');
  }

  // Register Customer account
  $(document).on('click', '.js-create-account', function (e) {     
    if ( $('input[name="customer[password]"]').val() != $('input[name="customer[password_confirmation]"]').val()) {
      e.preventDefault();
      alert('Passwords do not match.');
    }
    else {
      $(this).parents('form').submit();
    }
  });

  // Choose fuel - customer portal
  $(document).on('click', '.js-rc-choose-meal', function () {
    $('.total-meals-limit').val($('.subscription-qty').data('qty'));
    $('.limit-qty').text($('.subscription-qty').data('qty'));
    $('body').addClass('locked');
    $('.choose-fuel-popup').addClass('show');
  });

  $('.choose-fuel-popup .close-popup').on('click', function() {
    var $this = $(this);
    $this.parents('.choose-fuel-popup').removeClass('show');
    $('body').removeClass('locked');
  });

  $(document).on('click', '.js-rc-update-fuel', function () {
    function addMeal(index) {
      if (index == cartParams.length) {
        $('#loader').addClass('hidden');
        ReCharge.Toast.addToast("Success", "Successfully updated your next Fuel Box.");
        return;
      }
      (async () => {
        let addressId = ReCharge.Novum.subscription.address_id;
        let nextChargeDate = ReCharge.Novum.subscription.next_charge_scheduled_at;
        let url = `/tools/recurring/portal/${ReCharge.Novum.customer.hash}/onetimes?token=${window.customerToken}`;
        let variantId = cartParams[index].id;
        let quantity = cartParams[index].quantity;

        let data = {
          shopify_variant_id: variantId,
          address_id: addressId,
          quantity: quantity,
          next_charge_scheduled_at: nextChargeDate
        }

        /*
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          header: '"Content-Type", "application/json"'
        }).then(response => response.json()).then(reponse => {
          console.log(response);
        });
        */

    
        try {
          const response = await axios.post(url, data).then(response => {
            // Successful request made
            console.log("Attempted add onetime, response from api:"); 
            console.log(response.data);

            $('.rc-onetimes').append(`
              <div class="rc-meals__row" data-onetime-id="${response.data.onetime.id}" data-product-id="${response.data.onetime.shopify_product_id}" data-variant-id="${response.data.onetime.shopify_variant_id}">
                ${response.data.onetime.product_title} x ${response.data.onetime.quantity}
              </div>
            `);

            addMeal(index + 1);
          });
        } catch (error) {
          // Request failed
          console.error(error);
          addMeal(index);
        }
      })();
    }
    $('.choose-fuel-popup').removeClass('show');
    $('#loader').removeClass('hidden');
    $('body').removeClass('locked');
    $('.rc-meals__note').hide();
    $('.js-rc-choose-meal').hide();
    addMeal(0);
  });

  // Add onetime purchase
  $(document).on('click', '.js-rc-upsell-add', function () {
    let variantId = $(this).data('variant-id');
    let addressId = ReCharge.Novum.subscription.address_id;
    let nextChargeDate = ReCharge.Novum.subscription.next_charge_scheduled_at;
    

    if ($(this).hasClass('added')) { // Remove product
      $(this).addClass('loading');
      let onetimeId = $(`.rc-extras__row[data-variant-id="${variantId}"]`).data('onetime-id');
      let url = `/tools/recurring/portal/${ReCharge.Novum.customer.hash}/onetimes/${onetimeId}/cancel?token=${window.customerToken}`;

      (async () => {    
        try {
          const response = await axios.post(url);
          // Successful request made
          console.log("Attempted remove onetime, response from api:"); 
          console.log(response.data);
          
          $(this).removeClass('loading');
          $(this).removeClass('added');
          $(this).addClass('active');
          $(this).parent().find('.rc-upsell-qty').removeClass('active');
          
          $(`.rc-extras__row[data-onetime-id="${onetimeId}"]`).remove();
    
          ReCharge.Toast.addToast("Success", "Successfully removed from next box");
    
        } catch (error) {
          // Request failed
          console.error(error);
        }    
      })();
    }
    else { // Add product
      $(this).addClass('loading');
      let url = `/tools/recurring/portal/${ReCharge.Novum.customer.hash}/onetimes?token=${window.customerToken}`;

      (async () => {

        let data = {
          shopify_variant_id: variantId,
          address_id: addressId,
          quantity: 1,
          next_charge_scheduled_at: nextChargeDate
        }
    
        try {
          const response = await axios.post(url, data);
          // Successful request made
          console.log("Attempted add onetime, response from api:"); 
          console.log(response.data);
          
          $(this).removeClass('loading');
          $(this).addClass('added');
          $(this).removeClass('active');
          $(this).parent().find('.rc-upsell-qty').addClass('active');
          $('.rc-onetimes').append(`
            <div class="rc-extras__row" data-onetime-id="${response.data.onetime.id}" data-product-id="${response.data.onetime.shopify_product_id}" data-variant-id="${response.data.onetime.shopify_variant_id}">
              <span class="extras__title">${response.data.onetime.product_title} x 1</span>
              <span class="extras__price">${ReCharge.Novum.Utils.getCurrency()}${response.data.onetime.price}</span>
            </div>
          `);
    
          ReCharge.Toast.addToast("Success", "Successfully added to next box");
    
        } catch (error) {
          // Request failed
          console.error(error);
        }    
      })();
    }
    /*
    fetch("/tools/recurring/access", {
      headers: {
          "x-recharge-storefront-access-token": "sk_1x1_bf85fda4c1e82f0f8df804b8d7602a3d77f6587f727b75949a84e62d5b01ca38"
      }
    }).then(response => response.json()).then(json => {

      var myHeaders = new Headers();
      myHeaders.append("X-Recharge-Version", "2021-11");
      myHeaders.append("X-Recharge-Access-Token", json.api_token);
      myHeaders.append("Content-Type", "application/json");
  
      var data = JSON.stringify({"batch_type":"onetime_create"});

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
      };

      fetch("https://api.rechargeapps.com/async_batches?shop_url=" + Shopify.shop, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

      var url = "https://api.rechargeapps.com/async_batches?shop_url=" + Shopify.shop;
      fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "X-Recharge-Access-Token": 'sk_1x1_bf85fda4c1e82f0f8df804b8d7602a3d77f6587f727b75949a84e62d5b01ca38',
          "X-Recharge-Version": "2021-11",
          "Content-Type": "application/json"
        },
        body: '{"batch_type":"onetime_create"}'
      }).then(response => response.json())
        .then(json => {
          console.log(json);
        });
    });
    */
  });

  // Update onetime quantity
  $(document).on('click', '.rc-upsell-qty__minus', function () {
    let value = parseInt($(this).parents('.rc-upsell-qty').find('.value').text());
    let newValue = value - 1;
    let variantId = $(this).parents('.rc-upsell-qty').data('variant-id');

    let onetimeId = $(`.rc-extras__row[data-variant-id="${variantId}"]`).data('onetime-id');

    $(this).parents('.rc-upsell-qty').addClass('disabled');

    if (newValue == 0) {
      let url = `/tools/recurring/portal/${ReCharge.Novum.customer.hash}/onetimes/${onetimeId}/cancel?token=${window.customerToken}`;

      (async () => {    
        try {
          const response = await axios.post(url);
          // Successful request made
          console.log("Attempted remove onetime, response from api:"); 
          console.log(response.data);
          
          $(this).parents('.rc-upsell-qty').removeClass('disabled');
          $(this).parents('.rc-upsell-qty').find('.value').text(newValue);
          $(this).parents('.rc-upsell-qty').removeClass('active');
          $(this).parents('.meal-add-cart').find('.rc-upsell-add').addClass('active');
          $(this).parents('.meal-add-cart').find('.rc-upsell-add').removeClass('added');
          
          $(`.rc-extras__row[data-onetime-id="${onetimeId}"]`).remove();
    
          ReCharge.Toast.addToast("Success", "Successfully removed from next box");
    
        } catch (error) {
          // Request failed
          console.error(error);
        }    
      })();
    }
    else {
      let url = `/tools/recurring/portal/${ReCharge.Novum.customer.hash}/onetimes/${onetimeId}?token=${window.customerToken}`;

      (async () => {
        let data = {
          quantity: newValue
        }
    
        try {
          const response = await axios.post(url, data);
          // Successful request made
          console.log("Attempted update onetime, response from api:"); 
          console.log(response.data);
          
          $(this).parents('.rc-upsell-qty').removeClass('disabled');
          $(this).parents('.rc-upsell-qty').find('.value').text(newValue);

          $(`.rc-extras__row[data-onetime-id="${response.data.onetime.id}"] .extras__title`).text(`${response.data.onetime.product_title} x ${response.data.onetime.quantity}`);
          $(`.rc-extras__row[data-onetime-id="${response.data.onetime.id}"] .extras__price`).text(`${ReCharge.Novum.Utils.getCurrency()}${(response.data.onetime.price * response.data.onetime.quantity).toFixed(2)}`);
          ReCharge.Toast.addToast("Success", "Successfully updated quantity");

        } catch (error) {
          // Request failed
          console.error(error);
        }    
      })();
    }
  });

  $(document).on('click', '.rc-upsell-qty__plus', function () {
    let value = parseInt($(this).parents('.rc-upsell-qty').find('.value').text());
    let newValue = value + 1;
    let variantId = $(this).parents('.rc-upsell-qty').data('variant-id');

    let onetimeId = $(`.rc-extras__row[data-variant-id="${variantId}"]`).data('onetime-id');
    let url = `/tools/recurring/portal/${ReCharge.Novum.customer.hash}/onetimes/${onetimeId}?token=${window.customerToken}`;

    $(this).parents('.rc-upsell-qty').addClass('disabled');

    (async () => {
      let data = {
        quantity: newValue
      }
  
      try {
        const response = await axios.post(url, data);
        // Successful request made
        console.log("Attempted update onetime, response from api:"); 
        console.log(response.data);
        
        $(this).parents('.rc-upsell-qty').removeClass('disabled');
        $(this).parents('.rc-upsell-qty').find('.value').text(newValue);

        $(`.rc-extras__row[data-onetime-id="${response.data.onetime.id}"] .extras__title`).text(`${response.data.onetime.product_title} x ${response.data.onetime.quantity}`);
        $(`.rc-extras__row[data-onetime-id="${response.data.onetime.id}"] .extras__price`).text(`${ReCharge.Novum.Utils.getCurrency()}${(response.data.onetime.price * response.data.onetime.quantity).toFixed(2)}`);
        ReCharge.Toast.addToast("Success", "Successfully updated quantity");
      } catch (error) {
        // Request failed
        console.error(error);
      }    
    })();
  });

  // Select regular/performance
  $(document).on('click', '.meal-variants__item', function () {
    let $mealItem = $(this).parents('.product-meal-item');
    $mealItem.find('.meal-variants__item--active').removeClass('meal-variants__item--active');
    $(this).addClass('meal-variants__item--active');
    $mealItem.find('.meal-qty').attr('data-price', $(this).attr('data-variant-price'));
    $mealItem.find('.meal-qty').attr('data-title', $(this).attr('data-variant-title'));
    $mealItem.find('.meal-qty').attr('id', $(this).attr('data-variant-id'));

    if (!$mealItem.find('.add-cart-btn').hasClass('active')) {
      let productID = $mealItem.find('.meal-qty').attr('data-product-id');
      $('#' + productID + '-meal').find('.meal-title').text($(this).attr('data-variant-title'));
      $mealItem.find('.meal-qty').trigger('change');
      
      var totalPriceCalc = 0.0;
      $('.product-meal-item').each(function() {
        var $this = $(this);
        var price = $this.find('.meal-qty').attr('data-price');
        var qty = $this.find('.meal-qty').val();
  
        totalPriceCalc = totalPriceCalc + (parseFloat(price) * parseFloat(qty));
      });
  
      $('.order-checkout .checkout-info .value').text(totalPriceCalc.toFixed(2));
    }
  });

  if ($('.plan-day-item.active').length) {
    $('.plan-day-item.active').trigger('click');
      
    var totalPriceCalc = 0.0;
    $('.product-meal-item').each(function() {
      var $this = $(this);
      var price = $this.find('.meal-qty').attr('data-price');
      var qty = $this.find('.meal-qty').val();

      totalPriceCalc = totalPriceCalc + (parseFloat(price) * parseFloat(qty));
    });

    $('.order-checkout .checkout-info .value').text(totalPriceCalc.toFixed(2));
    $('.plan-checkout-btn').prop('disabled', false);
  }

  /* Date picker */
  let prevSelectDeliveryDate = null;
  let now = new Date();
  let minDate = new Date();
  let maxDate = new Date();
  if (now.getHours() < 11){
    minDate.setDate(now.getDate() + 6);
  } else {
    minDate.setDate(now.getDate() + 7);
  }
  
  maxDate.setDate(now.getDate() + 28);
  var disabledDays = ["31-03-2024","29-03-2024"];
  $('.plan-day__picker').datepicker({
    minDate: minDate,
    maxDate: maxDate,
    dateFormat: 'DD d M',
    firstDay: 1,
    beforeShowDay: function (d) {
       
      if (d.getDay() != 1){
        var current_date_string = $.datepicker.formatDate('dd-mm-yy', d);
        console.log(current_date_string);
        
        if ((current_date_string == "25-12-2024") || (current_date_string == "26-12-2024") || (current_date_string == "27-12-2024") || (current_date_string == "01-01-2025") || (current_date_string == "02-01-2025")){
          return [false];
        } else {
          
          return[true];  
        }
        
      } else {
        return [false];
      }
      //return [(d.getDay() != 1)];
    },
    onSelect: function (d, inst) {
      menuDateSelected(d, inst);
    }
  });
  function menuDateSelected(d, inst){
    var selected_plan_date = $('#meal-plan-day').attr('data-date');
      console.log("menuDateSelected: "+selected_plan_date);
      //console.log(d+ " : "+ inst.selectedMonth+" : "+$(this).datepicker('getDate'));

    
      let day = d.slice(0, 3);
      let date = '';
      date += ('0' + inst.selectedDay).slice(-2) + '-';
      date += ('0' + (inst.selectedMonth + 1)).slice(-2) + '-';
      date += inst.selectedYear;

      let selectDeliveryDate = '';
      selectDeliveryDate += ('0' + (inst.selectedMonth + 1)).slice(-2) + '/';
      selectDeliveryDate += ('0' + inst.selectedDay).slice(-2) + '/';
      selectDeliveryDate += inst.selectedYear;
      console.log("selectDeliveryDate:"+selectDeliveryDate);
    $('#meal-plan-day').val(day);
      $('#meal-plan-day').attr('data-date', date);
      $('#meal-plan-day').attr('data-date-text', d);
      $('.product-meals.meals-selection').removeClass('pointer-events-none');
      
      if (selectDeliveryDate == "" || selectDeliveryDate.length != 10){
        console.log("empty plan date");
      } else {
        // var _selected_plan_date_month = selected_plan_date.split("-")[1];
        // var _new_plan_date_month = date.split("-")[1];
        // if (_selected_plan_date_month != _new_plan_date_month){
        //   clearSelectedMeals();
        // }
        console.log("delivery date: "+selectDeliveryDate);

      
        let selectDeliveryDataTS = new Date(selectDeliveryDate).getTime();

        
        $(".weekly-meals-date-tab").removeClass("delivery");
        $(".weekly-meals-date-tab").removeClass("active");
        $(".meals-selection-wrap .meals-grid-wrap").removeClass("delivery");  
        $(".meals-selection-wrap .main-meal-selection .meals-grid-wrap").hide();
        $(".meals-selection-wrap .main-meal-selection .meals-grid-wrap .meal-add-cart").hide();
        
        
        for (var i=1;i<=4;i++){
         
          var menuStartDateTS = new Date($("#weekly-meals-date-tab-"+i).data("startdate")).getTime();
          var menuEndDateTS = new Date($("#weekly-meals-date-tab-"+i).data("enddate")).getTime();
          //console.log(i+" : "+menuStartDateTS+" : "+menuEndDateTS+" : "+selectDeliveryDataTS);
          if (selectDeliveryDataTS>=menuStartDateTS && selectDeliveryDataTS<=menuEndDateTS ){
            //console.log("select: "+i);
            $("#weekly-meals-date-tab-"+i).addClass("delivery");
            $("#weekly-meals-date-tab-"+i).trigger("click");
            $("#weekly-meals-selection-"+i).addClass("delivery");
            $("#weekly-meals-selection-"+i+" .meal-add-cart").show();
            $("#no-meal-ready-for-choose").hide();
          }
        }

        if ($(".meals-selection-wrap .main-meal-selection .meals-grid-wrap:visible").length <= 0){
          $("#no-meal-ready-for-choose").css({"display":"block"}); 
          $("#no-meal-ready-for-choose").show(); 
        
        }

        if (prevSelectDeliveryDate !== null) {
          if (!areSameWeeks(new Date(prevSelectDeliveryDate), new Date(selectDeliveryDate), 3)){
            clearSelectedMeals();
            
            
          } 
        }

        prevSelectDeliveryDate = selectDeliveryDate;
        
        
        
        
      }


      //showMealsMenu(inst.selectedMonth);
    
      
    
        

    

    
  }

  function areSameWeeks(date1, date2, boundaryDay=0)
{
    if(date1 > date2)
    {
        let t = date1;
        date1 = date2;
        date2 = t;
    }

    if(((((date2 - date1)/1000)/3600)/24)>6)
    {
        return false;
    }

    let day1 = date1.getUTCDay();
    let day2 = date2.getUTCDay();

    if(day1 == boundaryDay)
    {
        return true;
    }

    if(day2 == boundaryDay)
    {
        return false;
    }

    let d1BoundaryDist = ((day1-boundaryDay)+7)%7;
    let d2BoundaryDist = ((day2-boundaryDay)+7)%7;

    if(d1BoundaryDist <= d2BoundaryDist)
    {
        return true;
    }

    return false;
}
  /*month menu*/
  function showMealsMenu(selected_month){
    //console.log(date);
    var _current_month = now.getMonth();
    if (_current_month == selected_month){
      $("#current-month-meal-selection").show();
      $("#next-month-meal-selection").hide();
    } else {
      $("#current-month-meal-selection").hide();
      $("#next-month-meal-selection").show();
    }
  }
  function clearSelectedMeals(){
    $.ajax({ // Clear Cart
      type: 'POST',
      url: '/cart/clear.js',
      dataType: 'json',
      beforeSend: function () {
        
      },
      success: function() {
        
      }
    });
    console.log("clearSelectedMeals");
    $(".detail-lists .qty-selection-wrap .value").each(function(){
      $(this).val(0).change();
      
    });
  }

  function initMealsMenu(){
    var selected_plan_date_arr = $('#meal-plan-day').attr('data-date').split("-");
    //console.log(selected_plan_date_arr[1]+"/"+selected_plan_date_arr[0]+"/"+selected_plan_date_arr[2]);
    if (selected_plan_date_arr.length == 3){
      //$('.plan-day__picker').datepicker('setDate', selected_plan_date_arr[0]+"/"+selected_plan_date_arr[1]+"/"+selected_plan_date_arr[2]);
      //console.log(new Date(selected_plan_date_arr[2],selected_plan_date_arr[1],selected_plan_date_arr[0]));
      //$('.plan-day__picker').datepicker('setDate', new Date(selected_plan_date_arr[2],selected_plan_date_arr[1]-1,selected_plan_date_arr[0]));
      //console.log($('.plan-day__picker').datepicker("getDate"));
      
      //$('.plan-day__picker').change();
      var id = document.getElementById('plan-day__picker'); 
      //replace someId with the id of the datepicker currently visible.  
      var inst = window.$.datepicker._getInst(id);
      menuDateSelected($('#plan-day__picker').val(), inst);
      
    }
    
  }
  initMealsMenu()

    
});