import {Component, View, bootstrap} from 'angular2/angular2';
import {ImageGallery} from 'image-gallery/image-gallery';

@Component({
    selector: 'application'
})
@View({
    templateUrl: 'application.html',
    directives: [ImageGallery]
})
export class Application {
    images:Array;

    constructor() {
        this.images = [
            {src: 'http://petattack.com/wp-content/uploads/2014/07/little_cute_cat_1920x1080.jpg'},
            {src: 'http://www.slopemedia.org/wp-content/uploads/2015/02/cats.jpg'},
            {src: 'http://jasonlefkowitz.net/wp-content/uploads/2013/07/Cute-Cats-cats-33440930-1280-800.jpg'},
            {src: 'http://stylonica.com/wp-content/uploads/2014/03/b73bcc559cb7886e72b7fd6ed101a3a71.jpg'},
            {src: 'http://animalpetdoctor.homestead.com/acat5.jpg'}
        ];
    }
}

bootstrap(Application);
