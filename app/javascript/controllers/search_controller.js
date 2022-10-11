import { Controller } from "@hotwired/stimulus"
import algoliasearch from "algoliasearch"
// Connects to data-controller="search"
export default class extends Controller {
  static targets = ["searchBar"]
  connect() {
    console.log("connected")
  }

  search(event) {
    console.log("Search started")
    event.preventDefault() // prevent reload of page
    const query = event.target.value
    const applicationID = this.searchBarTarget.dataset.algoliaId;
    const searchKey = this.searchBarTarget.dataset.algoliaSearchKey;

    const client = algoliasearch(applicationID, searchKey);
    const index = client.initIndex("Note"); // add index name

      // SEARCHABLE ATTRIBUTES: NOT WORKING --> NEED ADMIN KEY FOR THIS
        // unordered means that the position of the match within the attribute doesn’t affect ranking.
        // index.setSettings({
        //   searchableAttributes: [
        //     'unordered(title)',
        //     'unordered(content)'
        //   ]
        // }).then(() => {
        //   console.log("Index searchable attributes set to title and content")
        // });

    index
    .search(query)
    .then(({ hits }) => {
      console.log(hits);
    })
    .catch(err => {
      console.log(err);
    });
  }
}
