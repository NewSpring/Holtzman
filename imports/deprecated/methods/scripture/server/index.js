const Future = Npm.require("fibers/future");

Meteor.methods({
  getScripture(scripture) {
    check(scripture, String);

    let baseUrl = `http://www.esvapi.org/v2/rest/passageQuery?key=${Meteor.settings.public.esv}`;
    baseUrl += `&passage=${scripture}`;
    baseUrl += "&include-headings=false&include-passage-references=false";
    baseUrl += "&include-footnotes=false&include-audio-link=false&include-short-copyright=false";

    const f = new Future();

    // eslint-disable-next-line
    fetch(baseUrl)
      .then(response =>
        // eslint-disable-line
         response.text())
      .then(data => {
        f.return(data);
      })
      .catch(error => {
        console.error(error); // eslint-disable-line
        f.throw(error);
      });

    return f.wait();
  },
});
