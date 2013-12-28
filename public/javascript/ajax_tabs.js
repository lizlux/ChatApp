/**
 * jQuery plugin to extend bootstrap tabs so they work with ajax
 *
 * For now, this plugin expects that there's only one set of tabs and content on a page, but we can change this later.
 * Call like:
 *   $( '.myElem' ).ajaxTabs();
 * myElem should be an <ol> or <ul>
 * There also needs to be an element $('.ajax-tabs-content'), which is where the content will be loaded.
 *
 * @param elem
 * @param options
 */

$.ajaxTabs = function( elem, options ) {
	var $elem = $( elem ),
		$content = $( '.ajax-tabs-content' ),
		$anchors = $elem.find( 'li > a' );

	// TODO: once the multiple file loading issue is resolved, we can go back to $elem.on()
	//$elem.on( 'click', $anchors, function ( e ) {
	$anchors.click( function ( e ) {
		e.preventDefault();
		//tronic.pageLoadingGraphic.init();
		$.get( $( this ).parent().attr( 'data-url' ), function( html ) {
			//tronic.pageLoadingGraphic.remove();
			$content.html( html );
		} );
		return false;
	} );

	//$anchors.eq( 0 ).click();

};
$.fn.ajaxTabs = function( options ) {
	return this.each( function() {
		var $this = $( this ),
			plugin;
		console.log( typeof $this.data( 'ajax-tabs' ) );
		if ( typeof $this.data( 'ajax-tabs' ) !== 'object' ) {
			plugin = new $.ajaxTabs( this, options );
			$this.data( 'ajax-tabs', plugin );
			console.log( 'data attr is' );
			console.log( $this.data( 'ajax-tabs' ) );
		}
	} );
};
$( function() {
	$( '.ajax-tabs' ).ajaxTabs();
} );

