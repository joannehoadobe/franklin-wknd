/**
 * Loads the list of adventures.
 * @param {string} url The URL to an AEM persisted query providing the adventures
 * @returns {Document} The document
 */
async function fetchAdventures(url) {
    //const resp = await fetch(url);
    const headers = { 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3MDY4MTI2NTA4NzFfZjdhNTcwNmYtODdiNC00MjZlLThlY2QtMzI1NTRiOWI0MzBjX3VlMSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJkZXYtY29uc29sZS1wcm9kIiwidXNlcl9pZCI6IkU4MEYxRDcwNjVCMTU4OEUwQTQ5NUU0MEAwYzczMWNmZjYxNGJiNzdjNDk1ZTQ1LmUiLCJzdGF0ZSI6IllGcW5wY0VtTFZTM2p2d25FYVg2Rkc3MSIsImFzIjoiaW1zLW5hMSIsImFhX2lkIjoiNTIyQzFCOUI2MDJGMDc3MTBBNDk1Q0M5QGFkb2JlLmNvbSIsImN0cCI6MCwiZmciOiJZRkhYUVFISFhQUDc0SFVLSE1RVjJYQUFPWSIsInNpZCI6IjE3MDY4MTAxMTA5NzdfMmM5NWJmN2EtMTM4ZS00OWZjLWE2NWQtOGQ3MTljOTQ4YTJiX3V3MiIsInJ0aWQiOiIxNzA2ODEyNjUwODcyX2NiODIxMDI1LTM0ZGUtNDIyYy04NzVlLTU0YjQ0MzZkNjAxZl91ZTEiLCJtb2kiOiJkZjVhNzM4ZCIsInBiYSI6Ik9SRyxNZWRTZWNOb0VWLExvd1NlYyIsInJ0ZWEiOiIxNzA4MDIyMjUwODcyIiwiZXhwaXJlc19pbiI6Ijg2NDAwMDAwIiwic2NvcGUiOiJBZG9iZUlELG9wZW5pZCxyZWFkX29yZ2FuaXphdGlvbnMsYWRkaXRpb25hbF9pbmZvLnByb2plY3RlZFByb2R1Y3RDb250ZXh0IiwiY3JlYXRlZF9hdCI6IjE3MDY4MTI2NTA4NzEifQ.ggRNxP209agu3SLDRTWxccQ0v9SKPzUAE7l21wnTPezLj2q0fRv9hwu8nvx8wHzvIJBHt_xgb-q1aDNaEgupHgmHQSIyFrXjtC6H3iH-6h9a-aRJtLOk90R8dUpGGUiX6ylqHHvomDVYJmRFTaEMTLoXRYcQsHEJHnJJp1T35IfQ3WzIoJbLDr_y2HEMWn34Gy5eaJJZI68IQz1ey6jZs77eDUJrw0q1HQHcsei6NLb0wfNZC-I5s1CUlJl2FD8HPUJk14hbeZzaumdajpX1_rL33asm4NpbUpnyrxtvVXuqS2suHVYMZA2MBpp-1Q4-LnbUxkunCdJnNXZDqwuAuA' };
    const resp = await fetch(url, {
        headers
        //method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //mode: 'cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        //headers: {
        //    'Content-Type': 'application/json',
        //    "X-Authorization":'Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3MDY4MTI2NTA4NzFfZjdhNTcwNmYtODdiNC00MjZlLThlY2QtMzI1NTRiOWI0MzBjX3VlMSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJkZXYtY29uc29sZS1wcm9kIiwidXNlcl9pZCI6IkU4MEYxRDcwNjVCMTU4OEUwQTQ5NUU0MEAwYzczMWNmZjYxNGJiNzdjNDk1ZTQ1LmUiLCJzdGF0ZSI6IllGcW5wY0VtTFZTM2p2d25FYVg2Rkc3MSIsImFzIjoiaW1zLW5hMSIsImFhX2lkIjoiNTIyQzFCOUI2MDJGMDc3MTBBNDk1Q0M5QGFkb2JlLmNvbSIsImN0cCI6MCwiZmciOiJZRkhYUVFISFhQUDc0SFVLSE1RVjJYQUFPWSIsInNpZCI6IjE3MDY4MTAxMTA5NzdfMmM5NWJmN2EtMTM4ZS00OWZjLWE2NWQtOGQ3MTljOTQ4YTJiX3V3MiIsInJ0aWQiOiIxNzA2ODEyNjUwODcyX2NiODIxMDI1LTM0ZGUtNDIyYy04NzVlLTU0YjQ0MzZkNjAxZl91ZTEiLCJtb2kiOiJkZjVhNzM4ZCIsInBiYSI6Ik9SRyxNZWRTZWNOb0VWLExvd1NlYyIsInJ0ZWEiOiIxNzA4MDIyMjUwODcyIiwiZXhwaXJlc19pbiI6Ijg2NDAwMDAwIiwic2NvcGUiOiJBZG9iZUlELG9wZW5pZCxyZWFkX29yZ2FuaXphdGlvbnMsYWRkaXRpb25hbF9pbmZvLnByb2plY3RlZFByb2R1Y3RDb250ZXh0IiwiY3JlYXRlZF9hdCI6IjE3MDY4MTI2NTA4NzEifQ.ggRNxP209agu3SLDRTWxccQ0v9SKPzUAE7l21wnTPezLj2q0fRv9hwu8nvx8wHzvIJBHt_xgb-q1aDNaEgupHgmHQSIyFrXjtC6H3iH-6h9a-aRJtLOk90R8dUpGGUiX6ylqHHvomDVYJmRFTaEMTLoXRYcQsHEJHnJJp1T35IfQ3WzIoJbLDr_y2HEMWn34Gy5eaJJZI68IQz1ey6jZs77eDUJrw0q1HQHcsei6NLb0wfNZC-I5s1CUlJl2FD8HPUJk14hbeZzaumdajpX1_rL33asm4NpbUpnyrxtvVXuqS2suHVYMZA2MBpp-1Q4-LnbUxkunCdJnNXZDqwuAuA' // Here you can add your token
        //},
        //redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //body: JSON.stringify(data) // body data type must match "Content-Type" header
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
    // Get URL
    const link = $block.querySelector('a');
    var path = link ? link.getAttribute('href') : $block.textContent.trim();
    // Get content host
    var hostname = link.hostname;
  
    if (document.referrer.endsWith('https://exc-unifiedcontent.experience.adobe.net/')) {
      // Assume page is loaded within Universal Editor
      const aem = document.querySelector("meta[name='urn:adobe:aue:system:aemconnection']");    // was urn:adobe:aem:editor:aemconnection
      if (aem && aem.content && aem.content.startsWith('aem:')) {
        path = aem.content.substring(4) + link.pathname;
        hostname = aem.content.substring(4).replace('https://', '');
      }
    }
  
    // Fetch adventures
    const json = await fetchAdventures(path);
    if (json && json.data && json.data.adventureList && json.data.adventureList.items) {
      const $ul = document.createElement('ul');
      var adventures = json.data.adventureList.items;
      adventures.forEach((adventure, index) => {
        // List item
        const $li = document.createElement('li');
        $li.className = 'cmp-image-list__item';
        $li.setAttribute('itemscope', '');
        $li.setAttribute('itemid', 'urn:aemconnection:' + adventure['_path'] + '/jcr:content/data/master');
        $li.setAttribute('itemtype', 'reference');
        $li.setAttribute('itemfilter', 'cf');
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
        $article.appendChild($thumbnailDiv);
        // Title
        const $title = document.createElement('span');
        $title.className = 'cmp-image-list__item-title';
        $title.setAttribute('itemprop', 'title');
        $title.setAttribute('itemtype', 'text');
        // new attributes to support UE
        $title.setAttribute('data-aue-prop', 'title');
        $title.setAttribute('data-aue-type', 'text');
        $title.textContent = adventure.title;
        $article.appendChild($title);
  
        $li.appendChild($article);
        $ul.appendChild($li);
      });
      $block.replaceChildren($ul);
    } else {
      $block.innerHTML = '';
    }
  }