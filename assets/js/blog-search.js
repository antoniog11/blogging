// code here taken from https://blog.rampatra.com/how-to-add-search-in-jekyll

var posts = []; // hold json array from blog-pseudo-database.json

const search_form = document.getElementById("search_form")
search_form.addEventListener('submit',getSearchQuery)

// NEED TO FIGURE OUT HOW TO ESCAPE USER INPUT for safety
function getSearchQuery(event){
    const search_query = document.getElementById("search_field")
    //console.log(search_query.value)
    search(search_query.value)
    search_query.value = ''
    event.preventDefault()
}
 

function search(searchStr) {
    fetchSiteJson(searchCallback(searchStr));
}

function searchCallback(searchStr) {
    return function () {
        var options = { 		// initialize options for fuse.js
            shouldSort: true,
            threshold: 0.4,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
                {
                    name: "title",
                    weight: 0.3		// give title more importance
                },
                {
                    name: "content",
                    weight: 0.4
                }
            ]
        };

        var fuse = new Fuse(posts, options);  // initialize fuse.js library
        var results = fuse.search(searchStr)
       
        if (searchStr.length === 0) {
            updateResults(posts.slice(0, 5), true,searchStr); // if there are no search results, show some suggestions
        } else {
            updateResults(results, false,searchStr);
        }
       
    }
}

function updateResults(results, isSuggestion,searchStr) {
    var resultsHtml = '<h2 class="mb-4 fst-italic border-bottom">Search Results for <i>' + JSON.stringify(searchStr) + '</i></h2>';
    
    results.forEach(function (res){
        resultsHtml +=  '<article class="blog-post"> ' +
            '<h3 class="blog-post-title mb-2"> <a href="' + res.item.url + '">' + res.item.title +'</a></h3>' +
            '<p>' + res.item.readTime + '</p>' +
            '<p class="blog-post-meta">' + res.item.date + '</p>' +
            '<div class="blog-post-content">' + res.item.content + '</div> </article>'
    })

    const blog_content = document.getElementById("blog-content")
    blog_content.innerHTML = resultsHtml
}

async function fetchSiteJson(callback) {
    if (posts.length === 0) {
    	// fetch site.json file
        let response = await fetch("/../../../../../blog-post-database.json")
        if(response.ok){
            let json = await response.json();
            posts = json
            //console.log(posts)
        } else{
            console.log("Http-Error: " + response.status);
        }
        callback()
    } else { // we already have the posts so simply use it instead of downloading the file again
    	callback();
    }
}
    	