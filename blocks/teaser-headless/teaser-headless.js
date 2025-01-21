import { authProcess } from '../../../scripts/auth.js';
/**
 * Loads the list of adventures.
 * @param {string} url The URL to an AEM persisted query providing the adventures
 * @returns {Document} The document
 */
async function fetchTeaser(url) {
  // const resp = await fetch(url);
  const accessToken = authProcess.ACCESS_TOKEN;
  const headers = { 'Authorization': 'Bearer ' + accessToken };
  const resp = await fetch(url, {
    headers,
  });
  if (resp.ok) {
    return await resp.json();
  }
  return {};
}

/**
   * @param {HTMLElement} $block The adventures list block element
   */
export default async function decorate($block) {
  console.log('test export = ' + authProcess.REACT_APP_ABC);
  // Get URL
  const link = $block.querySelector('a');
  var path = link ? link.getAttribute('href') : $block.textContent.trim();
  // Get content host
  var hostname = link.hostname;
  console.log('path = ' + path);
  console.log('hostname = ' + hostname);

  if (document.referrer.endsWith('https://exc-unifiedcontent.experience.adobe.net/')) {
    // Assume page is loaded within Universal Editor
    const aem = document.querySelector("meta[name='urn:adobe:aue:system:aemconnection']");    // was urn:adobe:aem:editor:aemconnection
    if (aem && aem.content && aem.content.startsWith('aem:')) {
      path = aem.content.substring(4) + link.pathname;
      hostname = aem.content.substring(4).replace('https://', '');
      console.log('inside IF UE, path = ' + path);
      console.log('inside IF UE, hostname = ' + hostname);
    }
  }

  // Fetch teaser
  const json = await fetchTeaser(path);
  if (json) {
    var teaserTitle = json['jcr:title'];
    var teaserImage = json.fileReference;
    var teaserPretitle = json.pretitle;
    console.log('title = ' + teaserTitle + ', image = ' + teaserImage);

    $block.innerHTML = '<div class="teaser cmp-teaser--featured aem-GridColumn aem-GridColumn--default--12">test</div>';
    const $teaserDiv = document.createElement('div');
    $teaserDiv.className = 'cmp-teaser';
    // new attributes to support UE
    var teaserPath = link.pathname.slice(0, link.pathname.indexOf('.'));
    //teaserPath = teaserPath.replace('%3A', ':');
    teaserPath = decodeURIComponent(teaserPath);
    console.log('sliced decoded teaser path = ' + teaserPath);
    $teaserDiv.setAttribute('data-aue-resource', 'urn:aemconnection:' + teaserPath);
    $teaserDiv.setAttribute('data-aue-type', 'component');
    $teaserDiv.setAttribute('data-aue-label', 'Teaser');
    //$teaserDiv.setAttribute('data-aue-model', 'teaser');

    const $teaserContent = document.createElement('div');
    $teaserContent.className = 'cmp-teaser__content';
    const $teaserPretitle = document.createElement('p');
    $teaserPretitle.textContent = teaserPretitle;
    $teaserPretitle.setAttribute('data-aue-resource', 'urn:aemconnection:' + teaserPath);
    $teaserPretitle.setAttribute('data-aue-prop', 'pretitle');
    $teaserPretitle.setAttribute('data-aue-type', 'text');
    $teaserPretitle.setAttribute('data-aue-label', 'Pretitle');
    $teaserContent.appendChild($teaserPretitle);

    const $teaserTitle = document.createElement('h2');
    $teaserTitle.textContent = teaserTitle;
    $teaserTitle.setAttribute('data-aue-resource', 'urn:aemconnection:' + teaserPath);
    $teaserTitle.setAttribute('data-aue-prop', 'jcr:title');
    $teaserTitle.setAttribute('data-aue-type', 'text');
    $teaserTitle.setAttribute('data-aue-label', 'Title');
    $teaserContent.appendChild($teaserTitle);

    const $teaserDescription = document.createElement('div');
    $teaserDescription.className = 'cmp-teaser__description';
    const articleJson = await fetchTeaser("https://" + hostname + json.actions.item0.link + ".1.json");
    if (articleJson) {
      var descText = articleJson['jcr:content']['jcr:description'];
      console.log('desc text from article itself = ' + descText);
      if (descText) {
        $teaserDescription.textContent = descText;
      }
    }
    //$teaserDescription.textContent = 'The Australian West coast is a camper’s heaven. Endless miles of desert roads leading to secret beaches, vast canyons and crystal clear rivers, and the very few people you are likely to meet on your journey will be some of the most easy-going characters you’ll find anywhere in the world.';
    $teaserContent.appendChild($teaserDescription);

    // button
    const $teaserButtonLink = document.createElement('div');
    $teaserButtonLink.className = 'cmp-teaser__action-container';
    const $teaserLink = document.createElement('a');
    $teaserLink.className = 'cmp-teaser__action-link';
    $teaserLink.setAttribute('href', json.actions.item0.link + '.html');
    $teaserLink.textContent = 'Full Article';   // fix
    $teaserButtonLink.appendChild($teaserLink);
    $teaserContent.appendChild($teaserButtonLink);

    const $thumbnailDiv = document.createElement('div');
    $thumbnailDiv.className = 'cmp-teaser__image';
    const $innerThumbnailDiv = document.createElement('div');
    $innerThumbnailDiv.className = 'cmp-image';

    const $thumbnail = document.createElement('img');
    $thumbnail.src = 'https://' + hostname + teaserImage;
    // $thumbnail.alt = adventure.title;
    $thumbnail.className = 'cmp-image';
    $thumbnailDiv.appendChild($innerThumbnailDiv);
    // custom add to support UE
    $thumbnail.setAttribute('data-aue-resource', 'urn:aemconnection:' + teaserPath);
    $thumbnail.setAttribute('data-aue-prop', 'fileReference');
    $thumbnail.setAttribute('data-aue-type', 'media');
    $thumbnail.setAttribute('data-aue-label', 'Image');

    $innerThumbnailDiv.appendChild($thumbnail);

    $teaserDiv.appendChild($teaserContent);
    $teaserDiv.appendChild($thumbnailDiv);

    //$teaserDiv.appendChild($teaserContent);

    $block.replaceChildren($teaserDiv);
  }
  /*
  if (json && json.data && json.data.adventureList && json.data.adventureList.items) {
    const $ul = document.createElement('ul');
    var adventures = json.data.adventureList.items;
    adventures.forEach((adventure, index) => {
      // List item
      const $li = document.createElement('li');
      $li.className = 'cmp-image-list__item';
      $li.setAttribute('itemscope', '');
      //$li.setAttribute('itemid', 'urn:aemconnection:' + adventure['_path'] + '/jcr:content/data/master');
      //$li.setAttribute('itemtype', 'reference');
      //$li.setAttribute('itemfilter', 'cf');
      // new attributes to support UE
      $li.setAttribute('data-aue-resource', 'urn:aemconnection:' + adventure['_path'] + '/jcr:content/data/master');
      $li.setAttribute('data-aue-type', 'reference');
      $li.setAttribute('data-aue-filter', 'cf');

      // Article
      const $article = document.createElement('article');
      $article.className = 'cmp-image-list__item-content';
      // Thumbnail
      const $thumbnailDiv = document.createElement('div');
      $thumbnailDiv.className = 'cmp-image-list__item-image';
      const $thumbnail = document.createElement('img');
      $thumbnail.src = 'https://' + hostname + adventure.primaryImage['_dynamicUrl'];
      $thumbnail.alt = adventure.title;
      $thumbnail.className = 'cmp-image';
      $thumbnailDiv.appendChild($thumbnail);
      // custom add to support UE
      $thumbnail.setAttribute('data-aue-prop', 'primaryImage');
      $thumbnail.setAttribute('data-aue-type', 'media');
      $article.appendChild($thumbnailDiv);
      // Title
      const $title = document.createElement('span');
      $title.className = 'cmp-image-list__item-title';
      //$title.setAttribute('itemprop', 'title');
      //$title.setAttribute('itemtype', 'text');
      // new attributes to support UE
      $title.setAttribute('data-aue-prop', 'title');
      $title.setAttribute('data-aue-type', 'text');
      $title.setAttribute('data-aue-label', 'Title');
      $title.textContent = adventure.title;
      $article.appendChild($title);

      $li.appendChild($article);
      $ul.appendChild($li);
    });
    $block.replaceChildren($ul);
  } else {
    $block.innerHTML = '';
  }
  */
}
