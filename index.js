// ==UserScript==
// @name         レビュー依頼コメントのコピー
// @namespace    https://github.com
// @version      0.0.9
// @description  レビューやリリース時にslackに貼る形式をクリップボードにコピーする要素をGitHubのページに追加します
// @include      /^https://github.com/.*/pull/\d*/
// @include      /^https://github.com/.*/issues/\d*/
// @author       proshunsuke
// @license      MIT
// @grant        none
// ==/UserScript==

const copy = (e) => {
  const titleElement = document.querySelector('.js-issue-title');
  const title = titleElement.innerText.trim();
  const url = location.href.replace(/\/pull\/(\d*).*/g, '/pull/$1');
  const reviewComment = `\`\`\`
${title}
${url}
\`\`\``;
  const clipboardCopyElement = e.target.querySelector('clipboard-copy');
  clipboardCopyElement.setAttribute('value', reviewComment);
  clipboardCopyElement.click();
};

const lastNavElement = document.querySelector('li.d-inline-flex[data-view-component="true"]:last-of-type');

const reviewCommentElement = lastNavElement.cloneNode(true);
reviewCommentElement.querySelector('span').textContent = '　Copy review Comment';
reviewCommentElement.querySelector('a').setAttribute('href', 'javascript:void(0)');

const newClipboardCopyElement = document.querySelector('clipboard-copy.Link--onHover').parentNode.cloneNode(true);
const oldSvgElement = reviewCommentElement.querySelector('svg');
oldSvgElement.parentNode.replaceChild(newClipboardCopyElement, oldSvgElement);
lastNavElement.parentNode.appendChild(reviewCommentElement);

reviewCommentElement.addEventListener('click', copy);
