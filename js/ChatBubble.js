

//@ts-check
function mobileCheck() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

function detectMob() {
  return window.innerWidth <= 800 && window.innerHeight <= 600;
}

function getCurrentPageType() {

  const { pathname } = window.location;
  console.log("pathname", pathname);

  const pagePatterns = {
    ["Homepage"]: /^\/$/, // Root URL (home page)
    ["Collection"]: /^\/collections\//,
    ["Product"]: /^\/products\//,
    ["Cart"]: /^\/cart$/,
    ["Blog"]: /^\/blogs\//,
    ["About"]: /^\/about$/,
    ["Contact"]: /^\/contact$/,
    ["Faqs"]: /^\/pages\/faqs$/,
    ["FrequentlyAskedQuestions"]: /^\/pages\/frequently-asked-questions$/,
  };

  for (const [page, pattern] of Object.entries(pagePatterns)) {
    if (pattern.test(pathname)) {
      console.log(page)
      return page;
    }
  }

  return null;
};

function onPageWhereNeedToShowWidget(showOnThesePages){
  const currentPage = getCurrentPageType();

  if(!showOnThesePages){
    return false;
  }

  if (!currentPage || !showOnThesePages.includes(currentPage)) {
    return false;
  }
  return true;
}

const showWidget = (hasShowOnThesePages, showOnThesePages) => {
  const showTheWidget = onPageWhereNeedToShowWidget(showOnThesePages)
  if (!hasShowOnThesePages) {
    return true;
  }
  return showTheWidget;
};

const clickedChat = async () => {
  if (window.Shopify?.shop) {
    try {
      // Check if the user has previously clicked the chat button
      const isUnique = !chatClickedPreviously();
      const response = await sendReportToServer({
        shopDomain: "https://" + window.Shopify?.shop,
        eventType: "click_chat",
        isUnique,
      });
    } catch (error) {
      console.log("Error:", error);
    }
  }
};

const chatClickedPreviously = () => {
  if (localStorage.getItem("chatClicked")) {
    return true;
  } else {
    localStorage.setItem("chatClicked", "true");
    return false;
  }
};

const sendReportToServer = (data) => {
  return fetch("https://app.dondy.net/api/reports", {
    // important- this calls always to production server also if running locally
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const changeHtmlAccordingToChatWidgetDetails = async () => {
  const chatWidgetDetails = await fetch(
    "https://app.dondy.net/api/WhatsAppWidgetsView/" +
    window.Shopify?.shop,
    {
      // important- this calls always to production server also if running locally
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  let baseUrl = `https://wa.me/${chatWidgetDetails.phoneNumber}?text=`;
  if (!mobileCheck() && !detectMob() && chatWidgetDetails?.whatsAppDesktop === false) {
    baseUrl = `https://web.whatsapp.com/send?phone=${chatWidgetDetails.phoneNumber}&text=`;
  }

  const urlWithoutQuery = window.location.href.split('?')[0];
  const encodedURL = chatWidgetDetails.AddPageURL ? encodeURIComponent(urlWithoutQuery) : "";

  const prefilledMessage = chatWidgetDetails.prefilledMessage || "";
  if (prefilledMessage && encodedURL) {
    whatsAppLinkHtmlTag.setAttribute(
      "href",
      `${baseUrl}${prefilledMessage}%0A%0A${encodedURL}`
    );
  } else {
    whatsAppLinkHtmlTag.setAttribute(
      "href",
      `${baseUrl}${prefilledMessage}${encodedURL}`
    );
  }

  const getWidgetStyleBySize = (size) =>
    `style="--whatsapp-link-width: ${size}; --whatsapp-link-height: ${size};"`;

  const WidgetSizeStyle = getWidgetStyleBySize(chatWidgetDetails?.WidgetSize || "47px");

  whatsAppLinkHtmlTag.innerHTML = `<div ${WidgetSizeStyle}>${chatWidgetDetails?.WhatsAppIconSvg}</div>`;
  const RightSideInnerHTML = `<div ${WidgetSizeStyle} class="whatsapp-flex-container"><span class="whatsapp-text">${chatWidgetDetails?.TextBesideTheIcon}</span>${chatWidgetDetails?.WhatsAppIconSvg}</div>`;
  const LeftSideInnerHTML = `<div ${WidgetSizeStyle} class="whatsapp-flex-container">${chatWidgetDetails?.WhatsAppIconSvg}<span class="whatsapp-text">${chatWidgetDetails?.TextBesideTheIcon}</span></div>`;

  if (chatWidgetDetails.customHours && chatWidgetDetails.hasCustomHours) {
    if (chatWidgetDetails.inWorkingHours && chatWidgetDetails.phoneNumber) {
      chatBubbleElement?.classList.add("whatsapp-widget-visible");
    }
  } else {
    if (chatWidgetDetails.phoneNumber) {
      chatBubbleElement?.classList.add("whatsapp-widget-visible");
    }
  }
  chatBubbleElement?.classList.add(
    `whatsapp-widget-${chatWidgetDetails?.chatSide}`
  );

  if (
    (chatWidgetDetails?.chatSide === "left" ||
      chatWidgetDetails?.chatSide === "upper-left" ||
      chatWidgetDetails?.chatSide === "mid-upper-left") &&
    chatWidgetDetails?.TextBesideTheIcon
  ) {
    whatsAppLinkHtmlTag.innerHTML = LeftSideInnerHTML;
  }
  if (
    (chatWidgetDetails?.chatSide === "right" ||
      chatWidgetDetails?.chatSide === "upper-right" ||
      chatWidgetDetails?.chatSide === "mid-upper-right") &&
    chatWidgetDetails?.TextBesideTheIcon
  ) {
    whatsAppLinkHtmlTag.innerHTML = RightSideInnerHTML;
  }

  if (!showWidget(chatWidgetDetails?.hasShowOnThesePages, chatWidgetDetails?.showOnThesePages)) {
    console.log("remove!")
    chatBubbleElement?.classList.remove("whatsapp-widget-visible");
    return;
  }
  console.log("keep!")

};

const createChatBubble = () => {
  const chatBubble = document.createElement('div');
  chatBubble.id = 'chat-bubble';
  chatBubble.className = 'whatsapp-widget';
  chatBubble.setAttribute('aria-label', 'Open WhatsApp chat');
  const whatsappLink = document.createElement('a');
  whatsappLink.id = 'whatsapp-link';
  whatsappLink.target = '_blank';
  whatsappLink.setAttribute('aria-label', 'Send a message via WhatsApp');
  chatBubble.appendChild(whatsappLink);
  document.body.appendChild(chatBubble);
}
createChatBubble();
const chatBubbleElement = document.getElementById("chat-bubble");
const whatsAppLinkHtmlTag = document.getElementById("whatsapp-link");
chatBubbleElement?.addEventListener("click", clickedChat);
changeHtmlAccordingToChatWidgetDetails();