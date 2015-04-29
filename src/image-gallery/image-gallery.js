import {Component, View, NgElement} from 'angular2/angular2';

@Component({
    selector: 'image-gallery',
    properties: {
        "images": "images"
    }
})
@View({
    templateUrl: 'image-gallery/image-gallery.html'
})
export class ImageGallery {
    elem:NgElement;
    images:Array;
    currentImage:number;
    totalImages:number;

    constructor(elem:NgElement) {
        this.elem = elem.domElement;
        this.images = this.elem.querySelectorAll("img");

        for (var i=0, l=this.images.length; i<l; i++) {
            this.images[i].style.width = "400px";
        }

        this.currentImage = 0;
        this.totalImages = this.images.length;

        this.containerStyle = {
            width: this.totalImages * 400 + "px",
            left: "0px"
        };
    }

    onClickNext() {
        this.currentImage++;

        if (this.currentImage == this.images.length) this.currentImage = 0;

        this.updateStyle();
    }

    onClickPrev() {
        this.currentImage--;

        if (this.currentImage < 0) this.currentImage = this.images.length - 1;

        this.updateStyle();
    }

    updateStyle() {
        this.containerStyle.left = (this.currentImage * this.elem.offsetWidth * -1) + "px";
    }
}
