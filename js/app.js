const numEmployees = 12;
const $gallery = $( "#gallery" );
const apiUrl = 'https://randomuser.me/api/';

function createGallery( employees ) {
    // Make the requests for all of the users.
    for ( let i = 0; i < employees.length; i++ ) {
	employee = employees[ i ];
	addEmployeeCard( i, employee );
    }

}

function addEmployeeCard( index, person ) {

    let photo = person.picture.thumbnail;
    
    let html = `<div class="card" id="card-${index}">
                    <div class="card-img-container">
                        <img class="card-img" src="${photo}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="card-text">${person.email}</p>
                        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
                    </div>
                </div>`

    $card = $( html );
    $gallery.append( $( html ) );

    $( "#card-" + index ).click( function (event) { showModal( event, person ) } );
}

function showModal ( event, person ) {

    // Clear the previous modal if it exists.
    $( ".modal-container" ).hide();
    $( "body" ).remove( ".modal-container" );

    let birthday = new Date ( person.dob.date );
    
    
    
    let html = `
           <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn" onclick="clearModal()"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${ person.picture.thumbnail }" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="modal-text">${person.email}</p>
                        <p class="modal-text cap">${person.location.city}</p>
                        <hr>
                        <p class="modal-text">${person.phone}</p>
                        <p class="modal-text">${person.location.street}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                        <p class="modal-text">Birthday: ${ birthday.toDateString() } </p>
                    </div>
                </div>

                    // IMPORTANT: Below is only for exceeds tasks 
                <div class="modal-btn-container">`

    
    let target = $( event.currentTarget );

    // We want to get a list of all of the visible cards and then have the
    // prev and next buttons only flip between visible cards.
    let visibleCards = $( ".card:visible" );
    let index =  $( target ).index( ".card:visible" );
    
    // Only show the prev button if we are not the first element
    if ( index !== 0 ) {
	let prev = $( visibleCards[ index - 1 ] );
	let prevId = prev.attr( 'id' );

	html += `<button type="button" id="modal-prev" class="modal-prev btn" onclick="$( '#${ prevId }').click()">Prev</button>`;

    }

    // Only show the 
    if ( index !== (visibleCards.length - 1 ) ) {
	let next = $( visibleCards[ index + 1 ] ) ;
	let nextId = next.attr( 'id' );

	html += `<button type="button" id="modal-prev" class="modal-prev btn" onclick="$( '#${ nextId }').click()">Next</button>`;
    }

    html += `</div>
            </div>`;

    $( "body" ).append( html );

}

function clearModal () {
    $( ".modal-container" ).hide();
    $( "body" ).remove( ".modal-container" );
}

function addSearch( ) {

    let html =
	`<form action="#" method="get" id="search-form">
           <input type="search" id="search-input" class="search-input" placeholder="Search...">
           <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
         </form>`;

    $( ".search-container" ).html( html );

    $( "#search-form" )
	.submit( ( event ) =>
		 {
		     event.preventDefault();
		     let search = $( "#search-input" )[ 0 ].value;
		     applySearch( search );
		 } );
    

    
}

function applySearch( searchKey )
{

    // Grab all of the card entries so we can search through them.
    let $cards = $( ".card #name" );

    $cards.each( ( index, element ) =>
		 {
		     // Grab the person's name
		     let name = $( element ).text();
		     let regex = new RegExp( searchKey.toLowerCase() );

		     // Figure out the card container element.
		     let card = $( element ).parent().parent();


		     if ( regex.test( name ) ) {
			 card.show();
			 
		     }
		     else
		     {
			 card.hide();
		     }
		 }
	       );
    
    
}


addSearch();
$.getJSON( apiUrl + "?results=" + numEmployees, (data) => { createGallery( data.results ) } );


    

