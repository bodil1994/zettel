import { Controller } from "@hotwired/stimulus"
import algoliasearch from "algoliasearch"
// Connects to data-controller="search"
export default class extends Controller {
  static targets = ["searchBar"]
  connect() {
    console.log("connected")
    this.search()
  }

  search() {
    console.log("Search started")
    // client = algoliasearch("YourApplicationID", "YourAdminAPIKey");
    // index = client.initIndex("your_index_name");
    const applicationID = this.searchBarTarget.dataset.algoliaId;
    const searchKey = this.searchBarTarget.dataset.algoliaSearchKey;
    const client = algoliasearch(applicationID, searchKey);
    const index = client.initIndex("Note");

    // unordered means that the position of the match within the attribute doesn’t affect ranking.
    index.setSettings({
      searchableAttributes: [
        'unordered(title)',
        'unordered(content)'
      ]
    }).then(() => {
      console.log("Index searchable attributes set to title and content")
    });

    index
    .search("dog")
    .then(({ hits }) => {
      console.log(hits);
    })
    .catch(err => {
      console.log(err);
    });
  }
}
