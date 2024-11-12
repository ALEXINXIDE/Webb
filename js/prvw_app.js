let prvw_main_cart_items = [];

// variant tags for each store
const default_variants_tags = [
  {
    targetVariantParentSelector: "variant-radios",
    targetInputSelector: "fieldset",
    targetSelectSelector: null
  },
  {
    targetVariantParentSelector: "variant-selects",
    targetInputSelector: "fieldset",
    targetSelectSelector: null
  },
  {
    targetVariantParentSelector: "variant-selects",
    targetInputSelector: null,
    targetSelectSelector: ".product-form__input--dropdown"
  },
  {
    targetVariantParentSelector: ".product-form__controls-group",
    targetInputSelector: null,
    targetSelectSelector: ".selector-wrapper.product-form__item"
  },
  {
    targetVariantParentSelector: "#AddToCartForm--product-template",
    targetInputSelector: ".radio-wrapper.product-form__item fieldset",
    targetSelectSelector: null
  }
];

const accessibleThemes = [
  "dawn",
  "sense",
  "taste",
  "refresh",
  "ride",
  "studio",
  "spotlight",
  "publisher",
  "craft",
  "crave",
  "debut (vintage theme)",
  "theme-export-connecy-uk-com-live-connecy-uk-1"
];
const userThemeName = window.Shopify.theme.name.toLowerCase();

const prvw_tags = [
  {
    insertBefore: "product-form",
    quantityInput: ".product-form__quantity"
  },
  {
    insertBefore: '[data-pf-type="ProductATC"]',
    quantityInput: '[data-pf-type="ProductQuantity"]'
  },
  {
    insertBefore: ".product-single__add-to-cart",
    quantityInput: "[data-quantity-input]"
  },
  {
    insertBefore: ".product-form__item--submit",
    quantityInput: 'label[for="Quantity-product-template"]'
  },
  {
    insertBefore: ".ProductForm__BuyButtons, .ProductForm__AddToCart",
    quantityInput: ".ProductForm__QuantitySelector"
  },
  {
    insertBefore: ".product-page--submit-action",
    quantityInput: ".quantity-controls__outer"
  },
  {
    insertBefore: ".product-form__payment-container",
    quantityInput: ".product-form__info-item--quantity"
  },
  {
    insertBefore: "[data-product-submit]",
    quantityInput: ".product-quantity-label, .product-quantity-input"
  },
  {
    insertBefore: ".product-form--atc",
    quantityInput: ".product-form--atc-qty"
  },
  {
    insertBefore: ".purchase-details",
    quantityInput: ".purchase-details__quantity"
  },
  {
    insertBefore: ".product-single__form .payment-buttons",
    quantityInput: ".product__quantity"
  },
  {
    insertBefore: ".product-form--wide",
    quantityInput: ".product-single__quantity"
  },
  {
    insertBefore: ".product-single__add-to-cart",
    quantityInput: ".product-single__quantity"
  },
  { insertBefore: ".product-form--button-container", quantityInput: null },
  {
    insertBefore: ".js-product-add-to-cart",
    quantityInput: null
  },
  { insertBefore: ".product-detail__form__action", quantityInput: null },
  { insertBefore: ".product__submit__buttons", quantityInput: null },
  {
    insertBefore: ".buy-buttons-row",
    quantityInput: 'label[for="quantity"], .quantity-wrapper'
  },
  {
    insertBefore: ".t4s-product-form__buttons",
    quantityInput: "[data-quantity-wrapper]"
  },
  {
    insertBefore: ".qty-wrapper--with-payment-button",
    quantityInput: ".product-qty"
  },
  {
    insertBefore: ".shopify-product-form",
    quantityInput: ".product-quantity-block"
  },
  {
    insertBefore: ".shopify-product-form",
    quantityInput: ".product-block-quantity-selector"
  },
  {
    insertBefore: ".type_buy_buttons",
    quantityInput: ".type_quantity_selector"
  },
  {
    insertBefore: ".product-single__form .add-to-cart",
    quantityInput: ".product__quantity"
  },
  { insertBefore: ".purchase-section", quantityInput: ".quantity.form" },
  {
    insertBefore: ".product-form__buttons",
    quantityInput: ".quantity_selector"
  },
  { insertBefore: ".product__atc", quantityInput: ".quantity--input" },
  {
    insertBefore: ".product-form__payment-container",
    quantityInput: ".quantity-selector"
  },
  {
    insertBefore: '[data-icon="gpicon-product-cartbutton"]',
    quantityInput: '[data-icon="gpicon-product-quantity"]'
  },
  {
    insertBefore: ".pro-detail-button",
    quantityInput: ".product-quantity-action"
  },
  {
    insertBefore: ".cst-small-crtbtn",
    quantityInput: null
  },
  {
    insertBefore: ".product-single__shopify-payment-btn",
    quantityInput: ".selector-wrapper"
  },
  {
    insertBefore: ".yv-checkout-btn-full-width",
    quantityInput: ".yv-product-quantity"
  },
  {
    insertBefore: ".yv-checkout-btn",
    quantityInput: ".yv-product-quantity"
  },
  {
    insertBefore: ".product-form-product-template",
    quantityInput: null
  },
  {
    insertBefore: ".btn-cart-wrapper",
    quantityInput: null
  },
  {
    insertBefore: ".add-to-cart-container",
    quantityInput: null
  },
  {
    insertBefore: "#AddToCart-product-template",
    quantityInput: ".product__quantity--button"
  },
  {
    insertBefore: ".single_product__quantity",
    quantityInput: ".quantity_input"
  },
  {
    insertBefore: ".product-form__submit",
    quantityInput: ".product__quantity-wrapper"
  },
  {
    insertBefore: ".btn--add-to-cart",
    quantityInput: ".qtybox"
  },
  {
    insertBefore: '[data-pf-type="ProductATC2"]',
    quantityInput: "product-quantity"
  },
  {
    insertBefore: ".add-to-cart",
    quantityInput: null
  }
];

(function () {
  try {
    let prvw_variant_tags = [{ variantInput: ".product-form__option" }];

    const getQueryParam = () =>
      new URLSearchParams(window.location.search).get("prvw_app");
    function logDebug(message, data = null) {
      if (getQueryParam()?.toString() === "debug") {
        console.log("[ Pumper ]: ", message, data);
      }
    }

    console.log(
      `%c 🚀 Pumper app initialized! https://apps.shopify.com/pumper-quantity-breaks-product-bundles-discounts?utm_source=productLed&utm_medium=consoleLog&utm_campaign=productLed&utm_id=${Shopify.shop}`,
      "background: white; color: orange; padding: 8px; font-size: 16px; border-radius: 8px;"
    );

    console.log(
      "https://apps.shopify.com/pumper-quantity-breaks-product-bundles-discounts"
    );

    let prvw_length_bar = document.getElementById("prvw_length_bar").value;
    let productId = document.getElementById("pumperProductID").value;
    let pageSelectors = document.querySelectorAll("pumper-bundle");

    let insertAfterSelector = document.getElementById(
      "pumper_insert_after_btn"
    ).value;

    if (insertAfterSelector === "true") {
      let marginTopQB = document.getElementById(
        "prvw_custom_settings_marginTopQB"
      ).value;

      if (marginTopQB != null) {
        document.querySelector(".prvw_block").style.marginTop =
          marginTopQB + "px";
      } else {
        document.querySelector(".prvw_block").style.marginTop = "12px";
      }
    }

    function generateUniqueId() {
      const timestamp = new Date().getTime();
      const randomNumber = Math.floor(Math.random() * 1000000);
      const uniqueId = timestamp + "-" + randomNumber;
      return uniqueId;
    }

    function removeQuantityInput() {
      for (let i = 0; i < prvw_tags.length; i++) {
        let quantityInput = document.querySelector(prvw_tags[i].quantityInput);
        if (quantityInput) {
          logDebug(
            "removing the quantity input element selector: " +
              prvw_tags[i].quantityInput
          );
          quantityInput.remove();
          break;
        }
      }
    }

    function addCustomSelectorContainer() {
      let containerPosition;
      if (insertAfterSelector === "true") {
        containerPosition = "afterend";
      } else {
        containerPosition = "beforebegin";
      }

      if (pageSelectors.length > 0) {
        pageSelectors.forEach((pageSelector) => {
          pageSelector.innerHTML = bundle.innerHTML;
        });

        let defaultSelectedBar = document.getElementById(
          "prvw_default_selected"
        ).value;

        if (defaultSelectedBar !== "0" && defaultSelectedBar !== 0) {
          document.querySelector(
            `.prvw__quantity_input${defaultSelectedBar}`
          ).checked = true;
        }

        for (let i = 1; i <= prvw_length_bar; i++) {
          document
            .querySelectorAll(`.prvw__quantity_input${i}`)
            .forEach((item) => {
              let tempId = generateUniqueId();
              item.id = tempId;

              let labelElement = item.nextElementSibling;
              labelElement.setAttribute("for", tempId);
            });
        }

        document.querySelector("#prvw_bundle")?.remove();
      } else if (!prvw_custom_selector) {
        for (let i = 0; i < prvw_tags.length; i++) {
          let insertBefore = document.querySelector(prvw_tags[i].insertBefore);

          if (
            insertBefore &&
            !insertBefore.classList.contains("pmpr_bundle_form")
          ) {
            insertBefore.insertAdjacentHTML(
              containerPosition,
              bundle.innerHTML
            );
            insertBefore.style.marginTop = "8px";

            break;
          }
        }
      } else {
        let insertBefore = document.querySelector(prvw_custom_selector);
        insertBefore.insertAdjacentHTML(containerPosition, bundle.innerHTML);
        insertBefore.style.marginTop = "8px";
      }
    }

    function removeDefaultVariantOptions() {
      if (checkIfVariantExists()) {
        for (let e of document.getElementsByTagName("variant-radios")) {
          if (!accessibleThemes.includes(userThemeName)) {
            // console.log('removing from dom ')
            e.remove();
          }
        }
      }
    }

    function showHeaderFooterLines() {
      let prvw_hide_header_footer_lines = document.getElementById(
        "prvw_hide_header_footer_lines"
      ).value;
      if (prvw_hide_header_footer_lines == "true") {
        const root = document.querySelector(":root");
        root.style.setProperty(
          "--pseudo-prvw-header-footer-line-visibility",
          "none"
        );
      }
    }

    // theme(Exclusive) pseudo class color setting for most popular tag.
    function dynamicTagBackgroundColor() {
      const tagBackgroundColor = document.getElementById(
        "prvw_tag_background_color"
      ).value;
      const root = document.querySelector(":root");
      root.style.setProperty(
        "--pseudo-tag-background-color",
        tagBackgroundColor
      );
    }

    const root = document.querySelector(":root");

    // set dynamic height to hidden card of theme(Packy)
    const cardBrderRadius = document.getElementById("prvw_border_radius").value;
    const hiddenCardDynamicHeight = `calc(100% - ${
      2 * Number(cardBrderRadius)
    }px)`;

    root.style.setProperty(
      "--packy-hidden-card-height",
      hiddenCardDynamicHeight
    );

    // set dyanmic tag border-left and right color
    const labelBackgroundColor = document.getElementById(
      "prvw_background_color"
    ).value;
    root.style.setProperty(
      "--template3-tag-border-color",
      labelBackgroundColor
    );

    const bundle = document.getElementById("prvw_bundle");

    if (!document.getElementById("prvw_custom_var_selector")) {
      logDebug(
        "prvw_custom_var_selector not found",
        document.getElementById("prvw_custom_var_selector")
      );
      return;
    }

    if (performance.navigation.type == 2) {
      location.reload(true);
    }

    let prvw_custom_selector = document.getElementById(
      "prvw_custom_var_selector"
    ).value;

    removeQuantityInput();
    addCustomSelectorContainer();

    bundle.remove();

    removeDefaultVariantOptions();

    showHeaderFooterLines();

    dynamicTagBackgroundColor();

    /** New js */

    // checking if we have to add header footer lines or not

    function checkIfVariantExists() {
      let prvw_include_variant = document.getElementById(
        "prvw_include_variant"
      ).value;

      let prvw_has_only_default_variant = document.getElementById(
        "prvw_has_only_default_variant"
      ).value;

      if (
        prvw_include_variant == "true" &&
        prvw_has_only_default_variant != "true"
      ) {
        return true;
      } else {
        return false;
      }
    }
    let prvw_border_color = document.getElementById("prvw_border_color").value;
    let prvw_background_color_non_selected = document.getElementById(
      "prvw_background_color_non_selected"
    ).value;

    let prvw_background_color = document.getElementById(
      "prvw_background_color"
    ).value;
    let prvw_border_width = document.getElementById("prvw_border_width").value;
    let prvw_border_radius =
      document.getElementById("prvw_border_radius").value;
    let prvw_block_title_size = document.getElementById(
      "prvw_block_title_size"
    ).value;
    let prvw_bottom_title_size = document.getElementById(
      "prvw_bottom_title_size"
    ).value;
    let prvw_show_price_by_each = document.getElementById(
      "prvw_show_price_by_each"
    ).value;
    let prvw_money_format = document.getElementById("prvw_money_format").value;
    let prvw_dynamic_discount_string = document.getElementById(
      "prvw_dynamic_discount"
    ).innerHTML;

    let gemPageButton = document.querySelector("gp-product-button");
    const skipToCheckout = document.getElementById(
      "pumper_skip_to_checkout"
    ).value;

    let prvw_dynamic_discount = prvw_dynamic_discount_string
      .substring(0, prvw_dynamic_discount_string.length - 1)
      .replaceAll(/\s/g, "")
      .split(",")
      .map(Number);

    prvw_dynamic_discount.pop();
    let prvw_dynamic_price_string =
      document.getElementById("prvw_dynamic_price").innerHTML;
    let prvw_dynamic_price = prvw_dynamic_price_string
      .substring(0, prvw_dynamic_price_string.length - 1)
      .replaceAll(/\s/g, "")
      .split(",");
    prvw_dynamic_price.pop();
    let prvw_dynamic_quantity_string = document.getElementById(
      "prvw_dynamic_quantity"
    ).innerHTML;
    let prvw_dynamic_quantity = prvw_dynamic_quantity_string
      .substring(0, prvw_dynamic_quantity_string.length - 1)
      .replaceAll(/\s/g, "")
      .split(",");
    prvw_dynamic_quantity.pop();
    let variant_vals = document.getElementById("prvw_variant_vals").value;

    /** end new js */

    let prvw_forms = document.querySelectorAll("form[action='/cart/add']");
    if (!prvw_forms.length) {
      prvw_forms = document.querySelectorAll("form[action*='/cart/add']");
    }

    let prvw_id_state;
    let prvw_value_state;
    let prvw_i_state;
    let variant_values = "";
    let prvw_variant_map = {};
    let isVariantNotAvailable = false;
    let prvw_form_id_itr = 0;
    let prvw_variant_map2 = {};

    if (!checkIfVariantExists()) {
      prvw_forms.forEach(function (form) {
        let form_id = form.getAttribute("id");
        if (!form_id) {
          form.setAttribute("id", "prvw_form_" + prvw_form_id_itr);
          form_id = "prvw_form_" + prvw_form_id_itr;
          prvw_form_id_itr++;
        }

        if (gemPageButton) {
          form.querySelector("input[type=hidden][name=quantity]")?.remove();
        }

        let input = document.createElement("input");
        input.type = "hidden";
        input.name = "quantity";
        input.id = "prvw_custom_quantity_clone_" + form_id;
        input.classList.add("prvw_custom_quantity_clone_" + form_id);
        input.value = "1";
        input.setAttribute("form", form_id);
        form.prepend(input);
      });
    }

    let insertInputInForm = (item) => {
      document.querySelector(".product-variant-id")?.remove();
      let prevData = item;

      prvw_forms.forEach(function (form) {
        form.querySelector("input[type=hidden][name=id]")?.remove();
        form.querySelector("input[type=hidden][name=quantity]")?.remove();
        form
          .querySelectorAll("select[name=id]")
          ?.forEach((item) => item?.remove());

        form.querySelectorAll(".pmpr_input")?.forEach((item) => {
          item?.remove();
        });

        item.forEach((item, index) => {
          // console.log(item, "item");
          let id_input = document.createElement("input");
          id_input.type = "hidden";
          id_input.classList.add("pmpr_input");
          id_input.value = item.id;

          let q_input = document.createElement("input");
          q_input.type = "hidden";
          q_input.classList.add("pmpr_input");
          q_input.value = item.quantity;

          let id_name;
          let q_name;

          if (index == 0 || window?.mu_version) {
            id_name = "id";
            q_name = "quantity";
          } else {
            id_name = `items[${index - 1}][id]`;
            q_name = `items[${index - 1}][quantity]`;
          }

          id_input.name = id_name;
          q_input.name = q_name;

          prevData = prevData.map((data) => {
            if (data.id == id_input.value) {
              return {
                ...data,
                name: id_name
              };
            }
            return data;
          });

          form.prepend(id_input);
          form.prepend(q_input);
        });
      });

      // setTimeout(() => {
      //   if (accessibleThemes.includes(userThemeName)) {
      //     let isOurVariantsExists = checkIfVariantExists();
      //     if (isOurVariantsExists) {
      //       delayCheckImageVariant(prevData);
      //     }
      //   }
      // }, 1000);
    };

    function handleVariantImageChange(e) {
      let fieldsArray = [];
      let defaultVariantId;
      let deafultVariantTagName;

      for (let tag of default_variants_tags) {
        const variantElement = document.querySelector(
          tag.targetVariantParentSelector
        );

        if (variantElement) {
          defaultVariantId = variantElement.getAttribute("id");
          deafultVariantTagName = variantElement.tagName.toLowerCase();

          let isOurVariantsExists = checkIfVariantExists();

          if (isOurVariantsExists) {
            if (variantElement.tagName.toLowerCase() !== "form") {
              variantElement.style.display = "none";
            }
            if (variantElement.tagName.toLowerCase() === "form") {
              let radioWrapper =
                variantElement.querySelectorAll(".radio-wrapper");
              radioWrapper.forEach((item) => (item.style.display = "none"));
            }
          }

          const parentElement = variantElement.parentElement; // Access the parent element
          const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
              if (mutation.type === "childList") {
                // Loop through added nodes
                mutation.addedNodes.forEach((node) => {
                  // Check if the node is an element and matches the 'variant-selects' selector
                  if (
                    node.nodeType === Node.ELEMENT_NODE &&
                    node.matches(`${deafultVariantTagName}#${defaultVariantId}`)
                  ) {
                    // Check some condition to decide whether to set display none or block
                    if (isOurVariantsExists) {
                      node.style.display = "none";
                    } else {
                      node.style.display = "block";
                    }
                  }
                });
              }
            }
          });
          observer.observe(parentElement, { childList: true, subtree: true });

          let all_fieldsets = variantElement.querySelectorAll(
            tag.targetInputSelector
          );
          let all_selectFields = variantElement.querySelectorAll(
            tag.targetSelectSelector
          );

          let variantId = e?.target?.id;
          const selectedFieldsArray = [];
          let all_selected_fields = document.querySelectorAll(`#${variantId}`);
          all_selected_fields.forEach((item, index) => {
            selectedFieldsArray[index] = item.value;
          });

          if (all_fieldsets.length > 0) {
            all_fieldsets.forEach((item) => {
              let inputFields = item.querySelectorAll("input");
              fieldsArray = fieldsArray.concat(Array.from(inputFields));
            });

            selectedFieldsArray.forEach((selectedItem) => {
              fieldsArray.forEach((defaultItem) => {
                if (selectedItem === defaultItem.value) {
                  defaultItem.click();
                }
              });
            });
            break;
          } else if (all_selectFields.length > 0) {
            all_selectFields.forEach((item) => {
              let selectFields = item.querySelectorAll("select");
              fieldsArray = fieldsArray.concat(Array.from(selectFields));
            });

            selectedFieldsArray.forEach((selectedItem) => {
              fieldsArray.forEach((selectField) => {
                let optionsArray = Array.from(selectField.options);
                optionsArray.forEach((option) => {
                  let targetValue = option.value;
                  if (selectedItem == targetValue) {
                    selectField.value = selectedItem;
                    const event = new Event("change", { bubbles: true });
                    selectField.dispatchEvent(event);
                  }
                });
              });
            });
            break;
          }
        } else {
          console.warn(
            `Element not found for selector: ${tag.targetVariantParentSelector}`
          );
        }
      }
    }

    function matchVariantImageOnLoad() {
      let tempObj = {};
      for (const item in prvw_variant_map2) {
        tempObj[item] = prvw_variant_map2[item].id;
      }

      const selectContainer = document.querySelectorAll(
        `.prvw_selector_${prvw_value_state - 1}`
      );

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get("variant");
      let variant_combo_name;
      if (id) {
        for (const [key, value] of Object.entries(tempObj)) {
          if (value === id) {
            variant_combo_name = key;
          }
        }
        let variant_arr = variant_combo_name.split("^-^");
        const iterationTimes = selectContainer.length / variant_arr.length;

        let iterationCount = 0;
        for (let i = 0; i < iterationTimes; i++) {
          for (let j = 0; j < variant_arr.length; j++) {
            selectContainer[iterationCount].value = variant_arr[j];
            iterationCount++;
          }
        }
      }
    }

    function delayCheckImageVariant(prevData) {
      let currTargetElement = document.querySelector('.pmpr_input[name="id"]');
      let currTargetValue = currTargetElement.value;
      let prevElement = prevData.find((item) => item.name === "id");

      // console.log(prevElement.id, "previous ID");
      // console.log(currTargetElement.value, "current ID");

      if (prevElement && prevElement.id !== currTargetValue) {
        // console.log("Both ID is different, Revert to Prvious id");
        prvw_forms.forEach(function (form) {
          form.querySelectorAll('.pmpr_input[name="id"]').forEach((item) => {
            let parent = item.parentNode;
            let nextSibling = item.nextSibling; // Get the next sibling of the item

            item.remove(); // Remove the old element

            let id_input = document.createElement("input");
            id_input.type = "hidden";
            id_input.classList.add("pmpr_input");
            id_input.value = prevElement.id;
            id_input.name = "id";

            // Insert the new element at the same location where the old element was
            parent.insertBefore(id_input, nextSibling);
          });
        });
      }
    }

    function prvw_radio_control(id, value, pageBuildID, variantChange, e) {
      prvw_value_state = value;
      prvw_id_state = id;
      prvw_i_state = value - 1;
      let activeLabel;

      // *********************************************** //
      // variant image change functionality
      if (accessibleThemes.includes(userThemeName)) {
        handleVariantImageChange(e);
      }

      // for variant change we don't want the below two condition to execute

      if (!variantChange) {
        for (let i = 1; i <= prvw_length_bar; i++) {
          document
            .querySelectorAll(`.prvw__quantity_label${i}`)
            .forEach((item) => {
              item.style = "";
              item.style.backgroundColor = prvw_background_color_non_selected;
              item.style.borderRadius = prvw_border_radius + "px";
            });

          document.querySelectorAll(`.prvw__radio_btn${i}`).forEach((item) => {
            item.style.backgroundColor = prvw_border_color;
            item.style.boxShadow = "0 0 0 1px " + prvw_border_color;
          });
        }

        document.querySelectorAll(".block__cbmain--radio").forEach((item) => {
          item.style = "";
        });

        let labelElement = document.getElementById(pageBuildID);
        labelElement.checked = true;
        activeLabel = labelElement.nextElementSibling;

        let radioBtn = activeLabel.querySelector(".block__cbmain--radio");

        radioBtn.style.backgroundColor = prvw_border_color;
        radioBtn.style.boxShadow = "0 0 0 1px " + prvw_border_color;

        activeLabel.style.borderColor = prvw_border_color;
        activeLabel.style.backgroundColor = prvw_background_color;
        activeLabel.style.borderWidth = prvw_border_width + "px";

        if (accessibleThemes.includes(userThemeName)) {
          // console.log('yes included theme')
          let isOurVariantsExists = checkIfVariantExists();
          if (isOurVariantsExists) {
            // console.log('match variant is running')
            // matchVariantImageOnLoad();
          }
        }
      }

      let block_title_line_height =
        prvw_block_title_size > 24 ? prvw_block_title_size / 30 : "";
      let bottom_title_line_height =
        prvw_bottom_title_size > 9 ? prvw_bottom_title_size / 7 : "";
      document.getElementById("prvw__block_title").style.lineHeight =
        block_title_line_height;
      document.getElementById("prvw__bottom_title").style.lineHeight =
        bottom_title_line_height;

      logDebug("before variant specific code in js file");
      if (checkIfVariantExists()) {
        prvw_main_cart_items = [];
        let map = new Map();
        let iter = 0;
        let totalOriginalAmount = 0;
        let totalComparePrice = 0;
        let variantUnavailabiltyFlag = false;

        if (variantChange) {
          activeLabel = pageBuildID.closest("label");
        } else {
          let labelElement = document.getElementById(pageBuildID);
          activeLabel = labelElement.nextElementSibling;
        }

        activeLabel
          .querySelectorAll(".prvw_selector_" + (value - 1))
          .forEach(function (item, index) {
            variant_values += prvw_escape_html(item.value);

            let currOption = prvw_variant_map[variant_values];

            if (iter == variant_vals - 1) {
              if (
                currOption?.compare_at_price == null ||
                currOption.compare_at_price == ""
              ) {
                totalComparePrice += parseFloat(currOption?.price / 100);
              } else {
                totalComparePrice += parseFloat(
                  currOption.compare_at_price / 100
                );
              }
              totalOriginalAmount += parseFloat(currOption?.price / 100);

              iter = 0;
              if (map.has(currOption?.id)) {
                map.set(currOption?.id, map.get(currOption?.id) + 1);
              } else {
                map.set(currOption?.id, 1);
              }
              if (!currOption) {
                logDebug("current option is null", variant_values);
                logDebug("variant map", prvw_variant_map);
                variantUnavailabiltyFlag = variantUnavailabiltyFlag || true;
              }
              variant_values = "";
            } else {
              iter += 1;
            }
          });

        if (variantUnavailabiltyFlag) {
          isVariantNotAvailable = true;
          // const row = document.querySelectorAll(
          //   `.prvw_selector_${prvw_value_state - 1}_${i + 1}`
          // );
        } else {
          isVariantNotAvailable = false;
        }
        logDebug("totalOriginalAmount: " + totalOriginalAmount);
        logDebug("totalComparePrice: " + totalComparePrice);
        if (totalOriginalAmount) {
          if (prvw_show_price_by_each == "true") {
            if (prvw_dynamic_price[prvw_i_state] === "amount") {
              setTotalPrice(
                formatAmount(
                  (totalOriginalAmount - prvw_dynamic_discount[prvw_i_state]) /
                    prvw_dynamic_quantity[prvw_i_state]
                )
              );
            } else if (prvw_dynamic_price[prvw_i_state] === "percentage") {
              setTotalPrice(
                formatAmount(
                  (totalOriginalAmount -
                    (totalOriginalAmount *
                      prvw_dynamic_discount[prvw_i_state]) /
                      100) /
                    prvw_dynamic_quantity[prvw_i_state],
                  "percentage"
                )
              );
            } else if (prvw_dynamic_price[prvw_i_state] === "each") {
              setTotalPrice(
                formatAmount(
                  (totalOriginalAmount -
                    prvw_dynamic_discount[prvw_i_state] *
                      prvw_dynamic_quantity[prvw_i_state]) /
                    prvw_dynamic_quantity[prvw_i_state]
                )
              );
            } else if (prvw_dynamic_price[prvw_i_state] === "fixed") {
              setTotalPrice(formatAmount(prvw_dynamic_discount[prvw_i_state]));
            } else {
              setTotalPrice(
                formatAmount(
                  totalOriginalAmount / prvw_dynamic_quantity[prvw_i_state]
                )
              );
            }
          } else {
            if (prvw_dynamic_price[prvw_i_state] === "amount") {
              setTotalPrice(
                formatAmount(
                  totalOriginalAmount - prvw_dynamic_discount[prvw_i_state]
                )
              );
            } else if (prvw_dynamic_price[prvw_i_state] === "percentage") {
              logDebug("totalOriginalAmount: " + totalOriginalAmount);
              logDebug(
                "prvw_dynamic_discount[prvw_i_state]: " +
                  prvw_dynamic_discount[prvw_i_state]
              );
              logDebug(
                "prvw_dynamic_discount[prvw_i_state] / 100: " +
                  prvw_dynamic_discount[prvw_i_state] / 100
              );
              logDebug(
                "totalOriginalAmount * prvw_dynamic_discount[prvw_i_state] / 100: " +
                  (totalOriginalAmount * prvw_dynamic_discount[prvw_i_state]) /
                    100
              );

              setTotalPrice(
                formatAmount(
                  totalOriginalAmount -
                    (totalOriginalAmount *
                      prvw_dynamic_discount[prvw_i_state]) /
                      100,
                  "percentage"
                )
              );
            } else if (prvw_dynamic_price[prvw_i_state] === "each") {
              setTotalPrice(
                formatAmount(
                  totalOriginalAmount -
                    prvw_dynamic_discount[prvw_i_state] *
                      prvw_dynamic_quantity[prvw_i_state]
                )
              );
            } else if (prvw_dynamic_price[prvw_i_state] === "fixed") {
              setTotalPrice(formatAmount(prvw_dynamic_discount[prvw_i_state]));
            } else {
              setTotalPrice(formatAmount(totalOriginalAmount));
            }
          }
        }
        let totalValue = totalOriginalAmount;

        if (document.getElementById("bottomtitle__total__price")) {
          if (prvw_dynamic_price[prvw_i_state] === "amount") {
            totalValue =
              totalOriginalAmount - prvw_dynamic_discount[prvw_i_state];
          } else if (prvw_dynamic_price[prvw_i_state] === "percentage") {
            totalValue =
              totalOriginalAmount -
              (totalOriginalAmount * prvw_dynamic_discount[prvw_i_state]) / 100;
          } else if (prvw_dynamic_price[prvw_i_state] === "each") {
            totalValue =
              totalOriginalAmount -
              prvw_dynamic_discount[prvw_i_state] *
                prvw_dynamic_quantity[prvw_i_state];
          } else if (prvw_dynamic_price[prvw_i_state] === "fixed") {
            totalValue = prvw_dynamic_discount[prvw_i_state];
          }

          let formatType = prvw_dynamic_price[prvw_i_state];

          document
            .querySelectorAll(".bottomtitle__totalPrice__container")
            .forEach((item) => {
              item.innerHTML = formatAmount(totalValue, formatType);
            });
        }

        for (let [key, value] of map) {
          prvw_main_cart_items.push({
            id: key,
            quantity: value
          });
        }

        if (skipToCheckout !== "true" && !window.upcartMoneyFormat) {
          // console.log("kirua", prvw_variant_map);

          const activeSelectors = document.querySelectorAll(
            `#${e?.target?.id}`
          );
          // console.log("kirua2", e.target.id, activeSelectors);

          let activeSelectorId = [];
          activeSelectors.forEach((selector) =>
            activeSelectorId.push(selector.value)
          );

          // console.log("kriua 3", activeSelectorId.join(""));

          let activeId;
          if (e?.target?.value) {
            activeId = prvw_variant_map[activeSelectorId.join("")].id;

            prvw_main_cart_items = [
              ...prvw_main_cart_items.filter((item) => item.id === activeId),
              ...prvw_main_cart_items.filter((item) => item.id !== activeId)
            ];
          }

          // console.log("kirua 4", activeId, prvw_main_cart_items);

          insertInputInForm(prvw_main_cart_items);
        }

        isVarientStockEmpty();
        //change compare at price
        if (document.querySelector("#prvw_originalAmount_" + prvw_i_state)) {
          let prvw_customCompareAtPrice = document.getElementById(
            "prvw_customCompareAtPrice"
          ).value;

          if (
            prvw_customCompareAtPrice == "" ||
            prvw_customCompareAtPrice == "0"
          ) {
            if (totalComparePrice != totalValue) {
              document
                .querySelectorAll(".prvw__pb__originalAmount" + prvw_i_state)
                .forEach((item) => {
                  item.innerHTML = formatAmount(totalComparePrice);
                });
            }
          } else {
            const compareAtPrice =
              prvw_customCompareAtPrice * prvw_dynamic_quantity[prvw_i_state];
            if (compareAtPrice != totalValue) {
              document
                .querySelectorAll(".prvw__pb__originalAmount" + prvw_i_state)
                .forEach((item) => {
                  item.innerHTML = formatAmount(compareAtPrice);
                });
            }
          }
        }
      } else {
        logDebug("before without variant specic code in js file");
        prvw_forms.forEach((form, index) => {
          let quantityClone = document.querySelectorAll(
            ".prvw_custom_quantity_clone_" + form.getAttribute("id")
          );
          if (quantityClone.length > 0) {
            quantityClone.forEach((item) => {
              item.value = prvw_dynamic_quantity[prvw_i_state];
            });
          }
        });
        let pumperCustomQty = document.querySelector("#pumper_custom_qty");
        if (pumperCustomQty) {
          pumperCustomQty.value = prvw_dynamic_quantity[prvw_i_state];
        }
        if (document.getElementById("bottomtitle__total__price")) {
          if (prvw_dynamic_price[prvw_i_state] === "amount") {
            let price =
              document.getElementById("prvw_singleProductPrice").value / 100;
            price =
              price * prvw_dynamic_quantity[prvw_i_state] -
              prvw_dynamic_discount[prvw_i_state];
            document
              .querySelectorAll(".bottomtitle__totalPrice__container")
              .forEach((item) => {
                item.innerHTML = formatAmount(price);
              });
          } else if (prvw_dynamic_price[prvw_i_state] === "percentage") {
            let price =
              document.getElementById("prvw_singleProductPrice").value / 100;
            price =
              price * prvw_dynamic_quantity[prvw_i_state] -
              price *
                prvw_dynamic_quantity[prvw_i_state] *
                (prvw_dynamic_discount[prvw_i_state] / 100);

            document
              .querySelectorAll(".bottomtitle__totalPrice__container")
              .forEach((item) => {
                item.innerHTML = formatAmount(price, "percentage");
              });
          } else if (prvw_dynamic_price[prvw_i_state] === "each") {
            let price =
              document.getElementById("prvw_singleProductPrice").value / 100;
            price =
              price * prvw_dynamic_quantity[prvw_i_state] -
              prvw_dynamic_discount[prvw_i_state] *
                prvw_dynamic_quantity[prvw_i_state];
            document
              .querySelectorAll(".bottomtitle__totalPrice__container")
              .forEach((item) => {
                item.innerHTML = formatAmount(price);
              });
          } else if (prvw_dynamic_price[prvw_i_state] === "fixed") {
            price = prvw_dynamic_discount[prvw_i_state];
            document
              .querySelectorAll(".bottomtitle__totalPrice__container")
              .forEach((item) => {
                item.innerHTML = formatAmount(price);
              });
          } else {
            let price =
              document.getElementById("prvw_singleProductPrice").value / 100;
            price = price * prvw_dynamic_quantity[prvw_i_state];

            document
              .querySelectorAll(".bottomtitle__totalPrice__container")
              .forEach((item) => {
                item.innerHTML = formatAmount(price);
              });
          }
        }

        isProductStockEmpty();

        logDebug("after without variant specic code in js file");
      }
      // sendBarImpression(value);
    }

    function setTotalPrice(amount) {
      document
        .querySelectorAll(".prvw_totalAmount_price_" + prvw_i_state)
        .forEach((item) => {
          item.innerHTML = amount;
        });
    }

    const formatAmount = function (cents, type) {
      if (typeof cents == "string") {
        cents = cents.replace(".", "");
      }
      var value = "";
      var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
      let formatString = prvw_money_format;
      logDebug("formatString", formatString);
      function defaultOption(opt, def) {
        return typeof opt == "undefined" ? def : opt;
      }

      function ceilToTwoDecimalPlaces(num) {
        return Math.ceil(num * 100) / 100;
      }

      function formatWithDelimiters(number, precision, thousands, decimal) {
        precision = defaultOption(precision, 2);
        thousands = defaultOption(thousands, ",");
        decimal = defaultOption(decimal, ".");

        if (isNaN(number) || number == null) {
          return 0;
        }

        if (type === "percentage") {
          number = ceilToTwoDecimalPlaces(number).toFixed(precision);
        } else {
          number = number.toFixed(precision);
        }

        var parts = number.split("."),
          dollars = parts[0].replace(
            /(\d)(?=(\d\d\d)+(?!\d))/g,
            "$1" + thousands
          ),
          cents = parts[1] ? decimal + parts[1] : "";

        return dollars + cents;
      }

      switch (formatString.match(placeholderRegex)[1]) {
        case "amount":
          value = formatWithDelimiters(cents, 2);
          break;
        case "amount_no_decimals":
          value = formatWithDelimiters(cents, 0);
          break;
        case "amount_with_comma_separator":
          value = formatWithDelimiters(cents, 2, ".", ",");
          break;
        case "amount_no_decimals_with_comma_separator":
          value = formatWithDelimiters(cents, 0, ".", ",");
          break;
        case "amount_with_apostrophe_separator":
          value = formatWithDelimiters(cents, 2, "'", ".");
          break;
      }

      return formatString.replace(placeholderRegex, value);
    };

    const onPrvwWindowLoadJS = () => {
      logDebug("onload function JS");

      let defaultSelectedBar = document.getElementById(
        "prvw_default_selected"
      ).value;

      if (document.getElementById(`cb${defaultSelectedBar}`)) {
        document.getElementById(`cb${defaultSelectedBar}`).checked = true;
      }
      prvw_variant_map = JSON.parse(
        document.getElementById("prvw_variant_map").innerHTML
      );
      prvw_variant_map2 = JSON.parse(
        document.getElementById("prvw_variant_map2").innerHTML
      );

      if (window.pmpr_useThemeFont_qb !== "true") {
        let selectors = [
          ".prvw_block"
          // ".block__title"
          // ".prvw_block h3",
          // ".prvw_block h4",
          // ".prvw_block h5",
          // ".prvw_block h6",
          // ".prevprice span",
          // ".prvw_totalAmount_wrapper span",
          // ".template_4_prevprice",
          // ".block__cbinfo--item",
          // ".block__cbinfo--dropdown select"
        ];

        selectors.forEach((selector) => {
          document.querySelectorAll(selector).forEach((item) => {
            item.style.fontFamily =
              '-apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI",Roboto, "Helvetica Neue", sans-serif';
          });
        });
      }

      //before variant specific javascript
      logDebug("before variant specific javascript");

      if (checkIfVariantExists()) {
        prvw_variant_tags.forEach((item, index) => {
          let prvw_variant_tag = document.querySelector(item.variantInput);
          if (prvw_variant_tag) {
            prvw_variant_tag.remove();
          }
        });

        document
          .querySelectorAll("[data-shopify=payment-button]")
          .forEach((item) => item.remove());

        document
          .querySelectorAll(".prvw_selector_custom")
          .forEach(function (item) {
            item.addEventListener("change", function (e) {
              prvw_radio_control(
                prvw_id_state,
                prvw_value_state,
                this,
                true,
                e
              );
            });
          });
      }

      let prvw_forms = document.querySelectorAll("form[action='/cart/add']");
      if (!prvw_forms.length) {
        prvw_forms = document.querySelectorAll("form[action*='/cart/add']");
      }

      if (skipToCheckout === "true" || window.upcartMoneyFormat) {
        prvw_forms.forEach(function (item) {
          item.addEventListener("submit", function (event) {
            event.preventDefault();
            if (checkIfVariantExists()) {
              prvw_custom_cart_add();
            } else {
              prvw_custom_cart_add_without_variant();
            }
          });
          let prvw_button;
          try {
            prvw_button = document.querySelector(
              "#" + item.getAttribute("id") + " button"
            );
          } catch (e) {
            console.log(e);
          }
          if (prvw_button) {
            window.upcartShouldSkipAddToCartInterceptor = true;

            if (skipToCheckout === "true") {
              window.upcartShouldSkipAddToCart = true;
            }

            prvw_button.type = "button";
            prvw_button.addEventListener("click", (e) => {
              e.preventDefault();
              if (checkIfVariantExists()) {
                prvw_custom_cart_add();
              } else {
                prvw_custom_cart_add_without_variant();
              }
            });
          }
        });
      }

      logDebug("after variant specific javascript");
      document.querySelectorAll(".prvw_pair").forEach(function (item) {
        item.addEventListener("change", function () {
          prvw_radio_control(prvw_id_state, this.value, this.id, false);
        });
      });

      prvw_radio_control(
        defaultSelectedBar,
        defaultSelectedBar,
        document.querySelector(`.prvw__quantity_input${defaultSelectedBar}`).id,
        false
      );

      logDebug("before showing the container");

      logDebug("after showing the container");
      // sendImpressions();
      if (accessibleThemes.includes(userThemeName)) {
        let isOurVariantsExists = checkIfVariantExists();
        if (isOurVariantsExists) {
          matchVariantImageOnLoad();
        }
      }
      //   isVarientStockEmpty();
    };

    onPrvwWindowLoadJS();

    function prvw_escape_html(htmlStr) {
      let finalStr = htmlStr.replace(/&/g, "&amp;");
      finalStr = finalStr.replace(/</g, "&lt;");
      finalStr = finalStr.replace(/>/g, "&gt;");
      return finalStr;
    }

    function isVarientStockEmpty() {
      //tempObj ->  this object will store the stock quantity for all variants in {variant_name : quantity} key pair
      //outOfStock ->  outOfStock is used to determine whether there is any variant which is out of stock
      //prvw_value_state -> the current active offer index
      //splitArr ->  the value will determine how many times we have to iterate to iterate through all the select options
      //prvw_variant_map -> it has all the variant related info

      let tempObj = {};
      let outOfStock = false;

      // we have different functionality for a single variant and more than one variant
      if (variant_vals > 1) {
        // iterating through the prvw_variant_map
        // storing the variant name and quantity for all the variants in tempObj

        for (const item in prvw_variant_map) {
          if (prvw_variant_map[item].inv_m === "") {
            continue;
          }

          // checking if continue even if out of stock option is enabled
          if (prvw_variant_map[item].inv_p === "deny") {
            tempObj[item] = prvw_variant_map[item].quantity - 0;
          }
        }

        // now we have stock quantity of varient stored in tempObj
        // now just iterate through the number of select option we have and decrease the quantity by one for that varient option in tempObj
        // i.e if blue variant has 3 stock quantity then make it 2 in tempObj only
        // now check is the count for that varient is 0 if 0 then give that option red value otherwise the default value

        for (let i = 0; i < prvw_dynamic_quantity[prvw_value_state - 1]; i++) {
          let tempStr = ""; // this will be a concated value for the row of select option for ex: xl red variants then tempStr would be -> xlred for a iteration

          // selecting all select option in a row

          const row = document.querySelectorAll(
            `.prvw_selector_${prvw_value_state - 1}_${i + 1}`
          );

          row.forEach((item) => {
            tempStr += prvw_escape_html(item.value); //concatenating the value
          });
          // checking if the variant name exists in tempObj
          if (tempObj.hasOwnProperty(tempStr)) {
            if (tempObj[tempStr] <= 0) {
              row.forEach((item) => {
                item.style.border = "1px solid red";
              });

              outOfStock = true;
            } else {
              row.forEach((item) => {
                item.style.border = "1px solid #d9d9d9";
              });

              tempObj[tempStr] = --tempObj[tempStr];
            }
          } else {
            row.forEach((item) => {
              item.style.border = "1px solid #d9d9d9";
            });
          }

          tempStr = "";
        }
      } else {
        for (const item in prvw_variant_map) {
          if (prvw_variant_map[item].inv_m === "") {
            continue;
          }

          if (prvw_variant_map[item].inv_p === "deny") {
            tempObj[item] = prvw_variant_map[item].quantity - 0;
          }
        }

        for (let i = 0; i < prvw_dynamic_quantity[prvw_value_state - 1]; i++) {
          const selectContainer = document.getElementById(
            `prvw_selector_${prvw_value_state - 1}_${i + 1}`
          );

          if (tempObj.hasOwnProperty(selectContainer.value)) {
            if (tempObj[selectContainer.value] <= 0) {
              selectContainer.style.border = "1px solid red";
              outOfStock = true;
            } else {
              selectContainer.style.border = "1px solid #d9d9d9";
              tempObj[selectContainer.value] = --tempObj[selectContainer.value];
            }
          }
        }
      }

      if (outOfStock || isVariantNotAvailable) {
        logDebug("out of stock", outOfStock);
        logDebug("isVariantNotAvailable", isVariantNotAvailable);
        if (window.pmpr_showOutOfStockText === "true") {
          toggleOutOfStockContainer(true, window.pmpr_outOfStockText);
        } else {
          toggleOutOfStockContainer(
            true,
            isVariantNotAvailable
              ? "Selected item(s) not available"
              : "Highlighted item(s) are out of stock!"
          );
        }
      } else {
        toggleOutOfStockContainer(false, "");
      }
    }

    function isProductStockEmpty() {
      let has_only_default_variant = document.getElementById(
        "prvw_has_only_default_variant"
      ).value;

      let variantToCheck, quantity;

      if (has_only_default_variant === "true") {
        variantToCheck = prvw_variant_map["Default Title"];
        quantity =
          document.getElementById("prvw_default_variant_quantity").value - 0;
      } else {
        const firstKey = Object.keys(prvw_variant_map)[0];
        variantToCheck = prvw_variant_map[firstKey];
        quantity = prvw_variant_map[firstKey].quantity - 0;
      }

      if (variantToCheck?.inv_m === "") {
        return;
      }

      if (!isNaN(quantity) && variantToCheck?.inv_p === "deny") {
        let currVal = prvw_dynamic_quantity[prvw_value_state - 1];
        if (currVal) {
          if (quantity <= 0) {
            window.pmpr_showOutOfStockText === "true"
              ? toggleOutOfStockContainer(true, window.pmpr_outOfStockText)
              : toggleOutOfStockContainer(
                  true,
                  "This product is out of stock!"
                );
          } else if (currVal - 0 > quantity) {
            window.pmpr_showOutOfStockText === "true"
              ? toggleOutOfStockContainer(true, window.pmpr_outOfStockText)
              : toggleOutOfStockContainer(
                  true,
                  `Only ${quantity} item left in stock!`
                );
          } else {
            toggleOutOfStockContainer(false, "");
          }
        }
      }
    }

    function toggleOutOfStockContainer(show, message) {
      for (let i = 1; i <= prvw_length_bar; i++) {
        document
          .getElementById(`prvw_outOfStock_${i}`)
          .classList.add("prvw_d-none");
      }
      if (show) {
        document
          .getElementById(`prvw_outOfStock_${prvw_value_state}`)
          .classList.remove("prvw_d-none");
        document.getElementById(
          `prvw_outOfStock_${prvw_value_state}`
        ).innerHTML = message;
      } else {
        document
          .getElementById(`prvw_outOfStock_${prvw_value_state}`)
          .classList.add("prvw_d-none");
      }
    }

    dontHideBranding();
  } catch (e) {
    console.log("No Selector found in pumper");
    console.log(e);
  }
})();

function prvw_custom_cart_add() {
  let formData = {
    items: prvw_main_cart_items
  };

  let submit_url = window.Shopify.routes.root + "cart/add.js";

  const skipToCheckout = document.getElementById(
    "pumper_skip_to_checkout"
  ).value;

  let using_upcart = document.querySelector(
    '[data-upcart-cart-enabled="true"]'
  );

  fetch(submit_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then((data) => {
      if (using_upcart && skipToCheckout !== "true") {
        return;
      }
      //   window.upcartRefreshCart();
      if (skipToCheckout == "true") {
        window.location.href = "/checkout";
      } else {
        window.location.href = "/cart";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function prvw_custom_cart_add_without_variant() {
  const prvw_variant_map = JSON.parse(
    document.getElementById("prvw_variant_map").innerHTML
  );
  const prvw_quantity = document.querySelector("#pumper_custom_qty").value;

  let formData;

  let has_only_default_variant = document.getElementById(
    "prvw_has_only_default_variant"
  ).value;

  if (has_only_default_variant === "true") {
    formData = {
      items: [
        {
          id: prvw_variant_map["Default Title"].id,
          quantity: prvw_quantity
        }
      ]
    };
  } else {
    const firstKey = Object.keys(prvw_variant_map)[0];

    formData = {
      items: [
        {
          id: prvw_variant_map[firstKey].id,
          quantity: prvw_quantity
        }
      ]
    };
  }

  let submit_url = window.Shopify.routes.root + "cart/add.js";

  const skipToCheckout = document.getElementById(
    "pumper_skip_to_checkout"
  ).value;

  let using_upcart = document.querySelector(
    '[data-upcart-cart-enabled="true"]'
  );

  fetch(submit_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(() => {
      if (using_upcart && skipToCheckout !== "true") {
        return;
      }
      if (skipToCheckout == "true") {
        window.location.href = "/checkout";
      } else {
        window.location.href = "/cart";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function dontHideBranding() {
  try {
    const container_elements = document.querySelectorAll(
      ".pmpr__branding_link"
    );
    const anchor_elements = document.querySelectorAll(".prvw__branding_link");
    const targetElements = [...container_elements, ...anchor_elements];

    if (!targetElements || targetElements.length == 0) return;

    for (let i = 0; i < targetElements.length; i++) {
      let targetElement = targetElements[i];

      const observer = new MutationObserver(function (mutationsList) {
        mutationsList.forEach(function (mutation) {
          if (mutation.attributeName === "style") {
            const computedStyle = window.getComputedStyle(targetElement);
            // console.log(computedStyle.display);

            if (computedStyle.display === "none") {
              targetElement.style.setProperty("display", "block", "important");
              // console.log("Display changed to none, reverting it back.");
            }
            if (computedStyle.visibility === "hidden") {
              targetElement.style.setProperty(
                "visibility",
                "visible",
                "important"
              );
              // console.log("Visibility changed to hidden, reverting it back.");
            }
            if (computedStyle.opacity === "0") {
              targetElement.style.setProperty("opacity", "1", "important");
              // console.log("Opacity changed to 0, reverting it back.");
            }
          }
        });
      });
      // Observe changes to the 'style' attribute of the target element
      observer.observe(targetElement, {
        attributes: true,
        attributeFilter: ["style"]
      });
    }
  } catch (error) {
    console.log("error in dontHideBranding", error);
  }
}

// function sendImpressions() {
//   const shop = Shopify.shop;
//   const timestamp = new Date().getTime();
//   const rand = Math.round(Math.random() * 10000);
//   const offerName = document.getElementById("prvw_offerName").value;

//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   const raw = JSON.stringify({
//     shop: shop,
//     type: "widget",
//     offerName: offerName,
//     timestamp: timestamp + rand,
//   });
//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   fetch(
//     "https://wtw04tw4bh.execute-api.us-east-2.amazonaws.com/prod/impressions",
//     requestOptions
//   )
//     .then((response) => response.text())
//     .catch((error) => console.log("error", error));
// }

// function sendBarImpression(barId) {
//   const shop = Shopify.shop;
//   const timestamp = new Date().getTime();
//   const rand = Math.round(Math.random() * 10000);
//   const offerName = document.getElementById("prvw_offerName").value;

//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   const raw = JSON.stringify({
//     shop: shop,
//     type: "bar",
//     barId: barId,
//     offerName: offerName,
//     timestamp: timestamp + rand,
//   });
//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   fetch(
//     "https://wtw04tw4bh.execute-api.us-east-2.amazonaws.com/prod/impressions",
//     requestOptions
//   )
//     .then((response) => response.text())
//     .catch((error) => console.log("error", error));
// }
(function () {
  if (performance.navigation.type == 2) {
    location.reload(true);
  }
  /********************************* */
  // add container to the dom
  /********************************* */

  const bundle = document.getElementById("pmpr_bundle__main");
  let productId = document.getElementById("pumperProductIDBundle")?.value;
  const pageSelector = document.querySelector(
    "pumper-bundle-combo[product-id='" + productId + "']"
  );
  const prvw_custom_selector = document.getElementById(
    "prvw_bundles_custom_selector"
  )?.value;

  if (window.allOffers[0]?.settings?.useThemeFont !== true) {
    let selectors = [
      ".pmpr_bundle__header h2",
      ".pmpr_bundle__product_title h4",
      ".pmpr_bundle__product_price h1",
      ".pmpr_bundle__product_price p",
      ".pmpr_bundle__quantity",
      ".pmpr_bundle__custom_select select",
      ".pmpr_bundle__buy_all h2",
      ".pmpr_bundle__buy_all .pmpr_bundle__total_price h1",
      ".pmpr_bundle__buy_all .pmpr_bundle__total_price h3",
      ".pmpr_bundle__buy_all .pmpr_bundle__highlight_offer",
      ".pmpr_bundle__add_to_cart",
      ".pmpr_bundle__add_to_cart",
      ".pmpr_bundle__total_price"
    ];

    document.querySelector(".pmpr_bundle__root").style.fontFamily =
      '-apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI",Roboto, "Helvetica Neue", sans-serif';

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((item) => {
        item.style.fontFamily = "inherit";
      });
    });
  } else {
    let selectors = [
      ".pmpr_bundle__header h2",
      ".pmpr_bundle__product_title h4",
      ".pmpr_bundle__product_price h1",
      ".pmpr_bundle__product_price p",
      ".pmpr_bundle__quantity",
      ".pmpr_bundle__custom_select select",
      ".pmpr_bundle__buy_all h2",
      ".pmpr_bundle__buy_all .pmpr_bundle__total_price h1",
      ".pmpr_bundle__buy_all .pmpr_bundle__highlight_offer",
      ".pmpr_bundle__add_to_cart",
      ".pmpr_bundle__add_to_cart",
      ".pmpr_bundle__total_price"
    ];

    document.querySelectorAll(".pmpr_bundle__root").forEach((item) => {
      item.style.fontFamily = "inherit";
    });

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((item) => {
        // item.style.removeProperty("font-family");
        item.style.fontFamily = "";
      });
    });
  }

  dontHideBranding();

  function addCustomSelectorContainer() {
    if (pageSelector) {
      pageSelector.insertAdjacentHTML("beforebegin", bundle.innerHTML);
    } else if (!prvw_custom_selector) {
      for (let i = 0; i < prvw_tags.length; i++) {
        let insertBefore = document.querySelector(prvw_tags[i].insertBefore);
        if (
          insertBefore &&
          !insertBefore.classList.contains("pmpr_bundle_form")
        ) {
          insertBefore.insertAdjacentHTML("afterend", bundle.innerHTML);
          break;
        }
      }
    } else {
      try {
        let insertBefore = document.querySelector(prvw_custom_selector);
        insertBefore.insertAdjacentHTML("beforebegin", bundle.innerHTML);
      } catch (error) {
        console.log(error);
      }
    }
    bundle.remove();
  }

  /********************************* */
  // util functions
  /********************************* */

  const formatAmountSimple = function (value) {
    const moneyFormat = window.money_format;
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    return moneyFormat.replace(placeholderRegex, value);
  };

  const formatAmount = function (cents) {
    if (typeof cents == "string") {
      cents = cents.replace(".", "");
    }
    var value = "";
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    let formatString = window.money_format;

    function defaultOption(opt, def) {
      return typeof opt == "undefined" ? def : opt;
    }

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = defaultOption(precision, 2);
      thousands = defaultOption(thousands, ",");
      decimal = defaultOption(decimal, ".");

      if (isNaN(number) || number == null) {
        return 0;
      }

      number = Number(number).toFixed(precision);

      var parts = number.split("."),
        dollars = parts[0].replace(
          /(\d)(?=(\d\d\d)+(?!\d))/g,
          "$1" + thousands
        ),
        cents = parts[1] ? decimal + parts[1] : "";

      return dollars + cents;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case "amount":
        value = formatWithDelimiters(cents, 2);
        break;
      case "amount_no_decimals":
        value = formatWithDelimiters(cents, 0);
        break;
      case "amount_with_comma_separator":
        value = formatWithDelimiters(cents, 2, ".", ",");
        break;
      case "amount_no_decimals_with_comma_separator":
        value = formatWithDelimiters(cents, 0, ".", ",");
        break;
      case "amount_with_apostrophe_separator":
        value = formatWithDelimiters(cents, 2, "'", ".");
        break;
    }

    return formatString.replace(placeholderRegex, value);
  };

  /********************************* */
  // dom addition functions
  /********************************* */

  function setProductPrice() {
    const allOffers = window.allOffers;
    const allOffersDiv = document.querySelectorAll(".pmpr_bundle__root");

    function toggleOutOfStockContainer(show, message, currIndex) {
      let finalTxt;
      if (window.allOffers[0]?.settings.showOutOfStockText) {
        finalTxt = window.allOffers[0]?.settings.outOfStockText;
      } else {
        finalTxt = message;
      }

      // console.log(finalTxt);
      if (show) {
        document
          .getElementById(`prvw_bundle_outOfStock_${currIndex}`)
          .classList.remove("pmpr_d-none");

        document.querySelectorAll(".pmpr_bundle__product")[
          currIndex
        ].style.border = "1px solid red";

        document.querySelectorAll(".pmpr_bundle__custom_select")[
          currIndex
        ].style.border = "1px solid red";
        document.getElementById(
          `prvw_bundle_outOfStock_${currIndex}`
        ).innerHTML = finalTxt;
      } else {
        let { borderColor } = window.allOffers[0].typoGraphy.productRow;

        document
          .getElementById(`prvw_bundle_outOfStock_${currIndex}`)
          .classList.add("pmpr_d-none");

        document.querySelectorAll(".pmpr_bundle__product")[
          currIndex
        ].style.borderColor = borderColor;

        document.querySelectorAll(".pmpr_bundle__custom_select")[
          currIndex
        ].style.border = "1px solid #c9c9c9";
      }
    }

    function checkOutOfStock(currIndex, selectedVariantId) {
      try {
        let productInventory = window.pmpr_bundle_product_quantity;
        let id = selectedVariantId;

        if (productInventory.hasOwnProperty(id)) {
          let { quantity, inv_m, inv_p } = productInventory[id];

          if (inv_m !== null && inv_p === "deny" && quantity <= 0) {
            toggleOutOfStockContainer(true, "Product out of stock", currIndex);
          } else {
            toggleOutOfStockContainer(false, "", currIndex);
          }
        }
        // console.log(product.variants[0].inventory_management);
        // console.log(product.variants[0].inventory_quantity);
      } catch (error) {
        console.log(error);
      }
    }

    allOffersDiv.forEach((offer) => {
      const allSelectors = offer.querySelectorAll(".pmpr_bundle__selector");

      const currOfferId = offer.classList[1];
      const currOffer = allOffers[currOfferId];
      const allProducts = currOffer.comboProducts;
      let allPrice = new Map();

      function getVariantPrice(variants, selectedVariantId, quantity) {
        let currPrice;

        variants.forEach((variant) => {
          if (variant.id == selectedVariantId) {
            let variantPrice = variant.price / 100;
            let variantCompareToPrice = variant.compare_at_price / 100;

            let price = variantPrice * quantity;
            let compareAtPrice = variantCompareToPrice * quantity;
            if (currOffer.discount.type === "eachUnit") {
              price = price - Number(currOffer.discount.value);
            }

            currPrice = { price, compareAtPrice };
          }
        });
        console.log(currPrice);
        return currPrice;
      }

      function updateTotalPrice(allPrice) {
        let totalPrice = 0;
        let compareAtPrice = 0;

        for (const value of allPrice.values()) {
          totalPrice += Number(value.price);
          compareAtPrice += Number(value.compareAtPrice);
        }

        if (currOffer.discount.type === "percent") {
          totalPrice =
            totalPrice - (totalPrice * Number(currOffer.discount.value)) / 100;
        }

        if (currOffer.discount.type === "flat") {
          totalPrice = totalPrice - Number(currOffer.discount.value);
        }

        if (currOffer.discount.type === "specific") {
          totalPrice = Number(currOffer.discount.value);
        }

        console.log(" -> Setting total Price", totalPrice);

        const totalPriceDiv = offer.querySelector(".pmpr_bundle__total_price");
        totalPriceDiv.querySelector("h1").innerHTML = formatAmount(totalPrice);
        if (currOffer.settings.isComparePrice) {
          let finalComparePrice =
            currOffer.comparePrice == 0
              ? compareAtPrice
              : currOffer.comparePrice;
          totalPriceDiv.querySelector("h3").innerHTML = formatAmount(
            finalComparePrice - 0
          );
        }
      }

      function updatePrice(selector) {
        const selectedVariantId = selector.value;

        const parent = selector.closest(".pmpr_bundle__product");

        const currIndex = parent.classList[1];
        const currProduct = allProducts[currIndex];
        let currProductShopify = window.bundle_products[currIndex];

        let currPrice = getVariantPrice(
          currProductShopify.variants,
          selectedVariantId,
          currProduct.quantity,
          currOffer
        );

        const priceDiv = parent.querySelector(".pmpr_bundle__product_price");

        let currProductPrice = currOffer.settings.showEachUnitPrice
          ? currPrice.price / currProduct.quantity
          : currPrice.price;
        let currProductComparePrice = currOffer.settings.showEachUnitPrice
          ? currPrice.compareAtPrice / currProduct.quantity
          : currPrice.compareAtPrice;

        priceDiv.querySelector("h1").innerHTML = formatAmount(currProductPrice);
        if (currOffer.settings.isComparePrice && currProductComparePrice > 0) {
          priceDiv.querySelector("p").innerHTML = formatAmount(
            currProductComparePrice
          );
        }
        allPrice.set(currProduct.id, currPrice);
        updateTotalPrice(allPrice);

        checkOutOfStock(currIndex, selectedVariantId);
      }

      allSelectors.forEach((selector) => {
        updatePrice(selector);

        selector.addEventListener("change", (e) => {
          updatePrice(e.target);
          if (!window.upcartMoneyFormat) {
            insertInputInForm();
          }
        });
      });
    });
  }

  // function updateHighlightTag() {
  //   const allOffers = window.allOffers;
  //   const allOffersDiv = document.querySelectorAll('.pmpr_bundle__root');

  //   allOffersDiv.forEach((offer) => {
  //     const tag = offer.querySelector('.pmpr_bundle__highlight_offer');
  //     const currOfferId = offer.classList[1];
  //     const currOffer = allOffers[currOfferId];

  //     switch (currOffer.discount.type) {
  //       case 'percent':
  //         tag.textContent = currOffer.discount.value + '% OFF';
  //         break;

  //       case 'flat':
  //         tag.textContent =
  //           formatAmountSimple(currOffer.discount.value) + ' OFF';
  //         break;

  //       case 'eachUnit':
  //         tag.textContent = tag.textContent =
  //           formatAmountSimple(currOffer.discount.value) + ' OFF EACH';
  //         break;

  //       default:
  //         tag.textContent = 'Combo!';
  //         break;
  //     }
  //   });
  // }
  const allOffers = window.allOffers;

  async function addToCart(offerDiv, btn) {
    const currOfferId = offerDiv.classList[1];
    const currOffer = allOffers[currOfferId];
    const allProducts = currOffer.comboProducts;
    const buttonText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<div class="pmpr_bundle__loader" style="border-right-color: ${currOffer.typoGraphy.cta.color}" ></div>`;
    const allSelectors = offerDiv.querySelectorAll(".pmpr_bundle__selector");

    let items = [];
    allSelectors.forEach((selector) => {
      let selectedVariantId = selector.value;
      const parent = selector.closest(".pmpr_bundle__product");
      let productInventory = window.pmpr_bundle_product_quantity;

      const currIndex = parent.classList[1];

      const currProduct = allProducts[currIndex];
      currProduct.variants = window.bundle_products[currIndex].variants;
      let id = selectedVariantId;

      if (productInventory.hasOwnProperty(id)) {
        let { quantity, inv_m, inv_p } = productInventory[id];
        if (inv_m !== null && inv_p === "deny" && quantity <= 0) {
        } else {
          items.push({
            id: currProduct.variants.find((v) => v.id == selectedVariantId).id,
            quantity: currProduct.quantity
          });
        }
      } else {
        items.push({
          id: currProduct.variants.find((v) => v.id == selectedVariantId).id,
          quantity: currProduct.quantity
        });
      }
    });

    let formData = { items };

    let submit_url = window.Shopify.routes.root + "cart/add.js";

    try {
      fetch(submit_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then((res) => res.json())
        .then((res) => {
          btn.disabled = false;
          btn.innerHTML = buttonText;

          if (
            window.upcartMoneyFormat &&
            currOffer.settings.skipCartToCheckout !== true
          ) {
            return;
          }
          if (currOffer.settings.skipCartToCheckout) {
            window.location.href = "/checkout";
          } else {
            window.location.href = "/cart";
          }
        });
    } catch (error) {
      console.log(error);
      btn.disabled = false;
      btn.innerHTML = currOffer.typoGraphy.cta.text;
    }
  }

  let insertInputInForm = () => {
    let offerDiv = document.querySelector(".pmpr_bundle__root");

    let form = document.querySelector(".pmpr_bundle_form form");

    if (!form) {
      form = document.querySelector(".pmpr_bundle_form");
    }
    const currOfferId = offerDiv.classList[1];
    const currOffer = allOffers[currOfferId];
    const allProducts = currOffer.comboProducts;
    const allSelectors = offerDiv.querySelectorAll(".pmpr_bundle__selector");

    items = [];
    allSelectors.forEach((selector) => {
      let selectedVariantId = selector.value;
      const parent = selector.closest(".pmpr_bundle__product");
      let productInventory = window.pmpr_bundle_product_quantity;

      const currIndex = parent.classList[1];

      const currProduct = allProducts[currIndex];
      currProduct.variants = window.bundle_products[currIndex].variants;
      let id = selectedVariantId;

      if (productInventory.hasOwnProperty(id)) {
        let { quantity, inv_m, inv_p } = productInventory[id];
        if (inv_m !== null && inv_p === "deny" && quantity <= 0) {
        } else {
          items.push({
            id: currProduct.variants.find((v) => v.id == selectedVariantId).id,
            quantity: currProduct.quantity
          });
        }
      } else {
        items.push({
          id: currProduct.variants.find((v) => v.id == selectedVariantId).id,
          quantity: currProduct.quantity
        });
      }
    });

    form.querySelectorAll(".pmpr_input")?.forEach((item) => {
      item?.remove();
    });

    items.forEach((item, index) => {
      let id_input = document.createElement("input");
      id_input.type = "hidden";
      id_input.classList.add("pmpr_input");
      id_input.value = item.id;

      let q_input = document.createElement("input");
      q_input.type = "hidden";
      q_input.classList.add("pmpr_input");
      q_input.value = item.quantity;

      let id_name;
      let q_name;

      if (index == 0 || window?.mu_version) {
        id_name = "id";
        q_name = "quantity";
      } else {
        id_name = `items[${index - 1}][id]`;
        q_name = `items[${index - 1}][quantity]`;
      }

      id_input.name = id_name;
      q_input.name = q_name;

      form.prepend(id_input);
      form.prepend(q_input);
    });
  };

  function applyEventOnBtn() {
    const allOffersDiv = document.querySelectorAll(".pmpr_bundle__root");

    allOffersDiv.forEach((offer) => {
      const currOfferId = offer.classList[1];
      const currOffer = allOffers[currOfferId];

      if (window.upcartMoneyFormat || currOffer.settings.skipCartToCheckout) {
        const btn = offer.querySelector(".pmpr_bundle__add_to_cart");
        btn.type = "button";

        if (currOffer.settings.skipCartToCheckout) {
          window.upcartShouldSkipAddToCart = true;
        }

        btn.addEventListener("click", () => addToCart(offer, btn));
      } else {
        insertInputInForm();
      }
    });
  }

  function updateProductTitle() {
    if (window.allOffers[0].settings.customProductTitle === true) {
      let products = window.allOffers[0].comboProducts;
      let titleContainer = document.querySelectorAll(
        ".pmpr_bundle__product_title h4"
      );

      products.map((item, index) => {
        titleContainer[index].innerHTML = item.title;
      });
    }
  }

  if (window.inActiveStatus === true) {
    document
      .querySelector(".pmpr_bundle__inActive_state")
      .classList.remove("pmpr_d-none");

    document.querySelector(".pmpr_bundle__root").classList.add("pmpr_d-none");
  }

  updateProductTitle();
  addCustomSelectorContainer();
  // updateHighlightTag();
  setProductPrice();
  applyEventOnBtn();
})();
