// content to be removed and its parent
let contents = $('ytd-browse.style-scope.ytd-page-manager');
let contentsParent = contents.parent();
// colors to be cycled
const colors = ['red', 'green', 'blue'];

// Get an element at a random index between zero and three
// input: colors or images, array
function cycleElement (type, min = 0, max = 3) {
	return type[Math.floor(Math.random() * max - min + min)];
}

// content to be added
const div = $('<div></div>').attr('class', 'focus');
const quote = $('<h1>Get back to work!</h1>').attr('class', 'beautText').css('color', cycleElement(colors));
quote.appendTo(div);

// add content to page
div.appendTo(contentsParent);

// remove YouTube videos
contents.remove();

// animate quote text
quote.animate({fontSize: '10em'});

// helper function for retrieving a new, random image
function getNewImage (e) {
	$.ajax({
    method: 'GET',
    url: 'https://picsum.photos/list',
    success: result => {
     const image = cycleElement(result, 0, result.length);
     $(e.target).attr('src', 'https://unsplash.it/1200/800?image=' + image.id);
    },
    error: err => console.log(err)
	});
}

// get a random image from unsplash and add it to the page in place of distracting content
$.ajax({
  method: 'GET',
  url: 'https://picsum.photos/list',
  success: function(result) {
   const image = cycleElement(result, 0, result.length);
   $('<img>').attr('src', `https://unsplash.it/1200/800?image=` + image.id)
     .attr('height', '500px').attr('width', 'auto')
     .click(e => getNewImage(e)) // generate new, random image when image is clicked
     .appendTo(div) // add to page
     .hide().fadeIn('slow'); // fade in image
  },
  error: err => console.log(err)
});