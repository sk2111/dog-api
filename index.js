const cardContentRef = document.getElementById("content-container");
const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random/50';
const REQUEST_INIT = {
    Headers: {
        'Accept': 'application/json'
    }
};

//Helper to create DOM node
const createDOMNode = (tagName, content, attribute = []) => {
    const elem = document.createElement(tagName);
    if (content) {
        elem.innerText = content;
    }
    if (Array.isArray(attribute)) {
        attribute.forEach(({ name, value }) => elem.setAttribute(name, value));
    }
    return elem;
};

//card template 
const getCardTemplate = (url) => {
    const containerNode = createDOMNode('div', null, [{ name: 'class', value: 'card-container' }]);
    const imageNode = createDOMNode('img', null, [{ name: 'src', value: url }]);
    containerNode.append(imageNode);
    return containerNode;
};

(async () => {
    try {
        const response = await fetch(DOG_API_URL, REQUEST_INIT);
        const { message } = await response.json();
        cardContentRef.innerText = ''; //clear loading text
        message.forEach((url) => cardContentRef.append(getCardTemplate(url)));
    }
    catch (e) {
        console.log(e);
    }
})();