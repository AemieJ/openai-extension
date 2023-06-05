import { SelectedMessage, DOMMessageResponse, AddMessage } from '../types';

// const getSelectionBoundaryElement = (isStart: boolean) => {
//     let range, container;
//     range = document.getSelection()!.getRangeAt(0);
//
//     if (range) {
//        container = range[isStart ? "startContainer" : "endContainer"];
//
//        // Check if the container is a text node and return its parent if so
//        return container.nodeType === 3 ? container.parentNode : container;
//     }
// }
//
// const highlight = () => {
//     let arrayHighlight = [];
//     let first = <HTMLElement>getSelectionBoundaryElement(true), last = <HTMLElement>getSelectionBoundaryElement(false);
//     if (first !== null) {
//         let sibling = <HTMLElement>first.nextElementSibling;
//         arrayHighlight.push(first);
//         while (sibling !== null && sibling.contains(last) === false) {
//                 arrayHighlight.push(sibling);
//                 sibling = <HTMLElement>sibling.nextElementSibling;
//         }
//         if (sibling !== null)
//             arrayHighlight.push(sibling);
//     }
//
//     arrayHighlight.forEach((elm) => {
//         elm.style.backgroundColor = "#e6e6fa";
//         elm.style.color = "black";
//     });
// }

const changeTheAppearance = (
    selection: any,
    summary: string,
    tags: string[],
    id: string
) => {
    let parentNode = selection.baseNode.parentElement;
    let buttonChild = document.createElement('button');
    parentNode.id = 'tooltip-' + id;
    parentNode.style.display = 'inline';
    parentNode.style.background = '#e6e6fa';
    parentNode.style.color = 'black';

    buttonChild.innerText = 'Extract Summary';
    buttonChild.style.fontSize = '12px';
    buttonChild.style.background = '#f6f6f6';
    buttonChild.style.border = '2px solid #f6f6f6';
    buttonChild.style.color = '#000000';
    buttonChild.style.borderRadius = '10px';
    buttonChild.style.marginBottom = '5px';

    let duplicateButtonChild = document.createElement('button');
    duplicateButtonChild.innerText = 'Extract Summary';
    duplicateButtonChild.style.fontSize = '12px';
    duplicateButtonChild.innerText = 'Minimize summary';
    duplicateButtonChild.style.background = '#bd0000';
    duplicateButtonChild.style.color = '#ffffff';
    duplicateButtonChild.style.border = '2px solid #bd0000';
    duplicateButtonChild.style.borderRadius = '10px';
    duplicateButtonChild.style.marginBottom = '5px';

    let breakDiv = document.createElement('div');
    parentNode.insertAdjacentElement('beforebegin', duplicateButtonChild);

    buttonChild.onclick = () => {
        document.getElementById('tooltip-text-' + id)!.style.display = 'block';
        buttonChild.remove();
        parentNode.insertAdjacentElement('beforebegin', duplicateButtonChild);
        duplicateButtonChild.insertAdjacentElement('afterend', breakDiv);
    };

    duplicateButtonChild.onclick = () => {
        document.getElementById('tooltip-text-' + id)!.style.display = 'none';
        duplicateButtonChild.remove();
        parentNode.insertAdjacentElement('beforebegin', buttonChild);
        buttonChild.insertAdjacentElement('afterend', breakDiv); // buffer
    };
    let child = document.createElement('div');
    let secondChild = document.createElement('h3');
    let thirdChild = document.createElement('p');
    let fourthChild = document.createElement('div');
    let lists = document.createElement('ul');

    lists.style.display = 'flex';
    lists.style.flexWrap = 'wrap';
    lists.style.justifyContent = 'center';
    lists.style.padding = '0px !important';

    tags.forEach((tag) => {
        let singleton = document.createElement('li');

        singleton.onclick = () => {
            window.open('http://localhost:3000/tag?id=' + tag);
        };

        singleton.innerText = tag;
        singleton.style.flexBasis = '25%';
        singleton.style.background = '#e6e6fa';
        singleton.style.padding = '8px';
        singleton.style.margin = '5px';
        singleton.style.borderRadius = '10px';
        singleton.style.fontWeight = '500';
        singleton.style.textAlign = 'center';
        singleton.style.listStyle = 'none';

        lists.appendChild(singleton);
    });

    fourthChild.appendChild(lists);

    secondChild.innerText = 'Summary';
    thirdChild.innerText = summary;

    let unique_id = 'tooltip-text-' + id;
    child.id = unique_id;
    child.style.display = 'block';

    child.style.margin = '10px';
    child.style.border = '2px solid #f6f6f6';
    child.style.background = '#f6f6f6';
    child.style.color = 'black';
    child.style.padding = '7px';
    child.style.borderRadius = '30px';
    child.style.textAlign = 'center';
    child.style.position = 'relative';
    child.style.zIndex = '1';
    child.style.transition = 'all 0.4s ease';
    child.style.fontSize = '12px';

    child.appendChild(secondChild);
    child.appendChild(thirdChild);
    child.appendChild(fourthChild);

    parentNode.insertAdjacentElement('beforebegin', child);
    document.getElementById('tooltip-text-' + id)?.scrollIntoView();

    console.log('tooltip-text-' + id);
    document.getSelection()?.removeAllRanges();
};

const messagesFromReactAppListener = (
    msg: SelectedMessage | AddMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: DOMMessageResponse) => void
) => {
    console.log('[content.js]. Message received', msg);

    let selectedText = document.getSelection();
    if (msg.type === 'GET_SUMMARY') {
        fetch('http://localhost:8080/text', {
            method: 'POST',
            body: JSON.stringify({
                text: selectedText!.toString(),
                summary: '',
                tags: [],
                link: msg.tab.url,
                priority: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const response: DOMMessageResponse = {
                    text: data.summary,
                };
                console.log('[content.js]. Message response', response);
                changeTheAppearance(
                    selectedText,
                    data.summary,
                    data.tags,
                    data._id
                );
                sendResponse(response);
            });
    }

    return true;
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
