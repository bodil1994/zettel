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
    const query = event.target.value.toLowerCase()
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
      this.results(hits);
    })
    .catch(err => {
      console.log(err);
    });
  }

  results(hits) {
    console.log("results started")
    let ids = "/?"
    if (hits.length === 0) {
      ids += "ids[]=none"
    } else {
      hits.forEach((element) => {
        ids += "ids[]=" + element.id + "&"
      })
    };
    console.log(ids)
    const frame = document.getElementById('notes');
    console.log(frame)
    frame.src = ids
    frame.reload();
    console.log("frame reloaded")
  };

  reset(event) {
    console.log("Reset started");
    if (event.keyCode === 13) {
      event.preventDefault();
      // event.target.value = "";
    }

    if (event.target.value === "") {
      const frame = document.getElementById('notes');
      frame.src = "/"
      frame.reload();
      console.log("empty frame reloaded")
    };
  };
}
