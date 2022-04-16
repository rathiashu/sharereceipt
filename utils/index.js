
// const userAgent = window.navigator.userAgent.toLowerCase() || "";
// const isWindows = () => {
//     return userAgent.indexOf('windows') !== -1;
// };
const isAndroid = () => {
    // return !isWindows() && userAgent.indexOf('android') !== -1;
    return false;
};
const getWhatsAppBaseUrl = () => {
    let link = `https://wa.me/`;
    if (isAndroid()) {
        // use this link for android devices
        link = `whatsapp://send`;
    }
    return link;
};
const urlEncodeText = (text) => {
    return encodeURIComponent(text);
};



var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const shareTextToWhatsApp = (text) => {
    window.location.href = `${getWhatsAppBaseUrl()}?text=${urlEncodeText(text)}`;
};
const getWhatsAppClickToChatLink = (text) => {
    return `${getWhatsAppBaseUrl()}?text=${urlEncodeText(text)}`;
};
const hasNativeSharingSupport = () => {
    if (navigator.share) {
        return true;
    }
    return false;
};
const shareTextViaNativeSharing = (data, fallbackFunction) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield navigator.share(data);
    }
    catch (err) {
        if (typeof fallbackFunction === 'function') {
            fallbackFunction();
        }
    }
});

const numberFormat = (num, currency) => {
    return currency
        ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num)
        : new Intl.NumberFormat('en-IN').format(num);
}


const sortList = (varA, varB) => {
    if (varA == null || varB == null) {
      // property doesn't exist on either object
      return 0;
    }
    varA = (typeof varA === 'string')
      ? varA.toUpperCase() : varA;
    varB = (typeof varB === 'string')
      ? varB.toUpperCase() : varB;

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return comparison;
}

export {
    getWhatsAppClickToChatLink,
    shareTextViaNativeSharing, 
    hasNativeSharingSupport,
    shareTextToWhatsApp,
    numberFormat,
    sortList,
}

