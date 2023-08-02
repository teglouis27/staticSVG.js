//This libary is an ultra-light libray of static SVG functions to be used in JavaScript. 
//It is is a very small subset of SVG.js, but to be also used more compactly than SVG.js and states errors explicitly. 
// Usage: Units are necessary! Tests are at the bottom of the script.

class SVG_InputValidator {

    //The functions that are inside the Svg Input Validator class are to validate input.
    static isValidRGBA(str) {
        const regex = /^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d?(?:\.\d{1,2})?)\)$/;
    
        const colorCode = str.toString();
    
        if (regex.test(colorCode)) {
            const values = colorCode.match(regex).slice(1).map(Number);
            
            if (values.slice(0, 3).every(num => num >= 0 && num <= 255) && values[3] >= 0 && values[3] <= 1) {
                return true;
            } else {
                console.error("Invalid color code values. Ensure values are within valid range.");
            }
        } else {
            console.error("Invalid color code format. The color must be of the format: rgba().");
        }
    }
    
    static isValidCSSDimension_and_Unit(str) {
    
        const units = ["%", "ch", "cm", "em", "ex", "in", "lh", "mm", "pc", "pt", "px", "rem", "vh", "vmax", "vmin", "vw"];
        let numPart = "";
        let unitPart = "";
    
        str = str.toString();
    
        if(str.length <= 18) {
        
        let i = 0;
        while (i < str.length && ((str[i] >= '0' && str[i] <= '9') || str[i] === '.' || str[i] === '-')) {
            numPart += str[i];
            i++;
        }
    
        while (i < str.length) {
            unitPart += str[i];
            i++;
        }
    
        if (isNaN(parseFloat(numPart))) {
            console.error("Invalid input. The numeric part is not a valid number.");
        };
    
        if (!units.includes(unitPart)) {
            console.error("Invalid input. The unit part must be a valid CSS unit.");
        };
    
        //This returns the CSS dimension and unit for manipulation in JavaScript
        if (!isNaN(parseFloat(numPart)) && units.includes(unitPart)) {
            return true;
        };
    
    } else {
        console.error("The dimension value has too many characters.");
        console.error("The number of charactars must be less than or equal to 18.");
    }
    }
    
    //We do not allow for SVG paths with curves.
    static isValidSVGPath(pathString) {
        const regex = /^[MmLlHhVvZz0-9\-,.\s]+$/;
    
        pathString = pathString.toString();
        
        if(regex.test(pathString) == true) {
            return true;
        } else {
            console.error("The path is not a valid path string.");
        }
    }
    
    static isValidSVGPolyline(polylineString) {
        const regex = /^(\s*\d+(?:\.\d+)?\s*,\s*\d+(?:\.\d+)?\s*)+$/;
    
        polylineString = polylineString.toString();
    
        if(regex.test(polylineString.trim())) {
            return true;
        } else{
            console.error("The polyline is not a valid polyline string.");
        }
    }
    
    static isValidFontFamily(str) {
        const regex = /^[a-zA-Z0-9 \-,'"]+$/;
        
        if(regex.test(str) == true) {
                return true;
            } else {
                console.error("The string is not a valid font family string.");
        }
    }
}
    
    class SvgElementCreator {
        constructor(svgNamespace) {
            this.svgNamespace = svgNamespace || "http://www.w3.org/2000/svg";
        }
    
    //Basic Shapes: <circle>, <ellipse>, <line>, <path>, <polygon>, <polyline>, <rect>
    
    //This function dynamically creates an SVG circle. A circle is a special case of an ellipse.
    Circle(svg, cx, cy, r, fill, strokeColor, strokeWidth){
    
        if( 
            SVG_InputValidator.isValidCSSDimension_and_Unit(cx) == true &&
            SVG_InputValidator.isValidCSSDimension_and_Unit(cy) == true &&
            SVG_InputValidator.isValidCSSDimension_and_Unit(r) == true &&
            SVG_InputValidator.isValidRGBA(fill) == true &&
            SVG_InputValidator.isValidRGBA(strokeColor) == true &&
            SVG_InputValidator.isValidCSSDimension_and_Unit(strokeWidth) == true) {

            let circle = document.createElementNS(this.svgNamespace, "circle");
    
            circle.setAttribute("cx",cx.toString());
            circle.setAttribute("cy",cy.toString());
            circle.setAttribute("r",r.toString());
            circle.setAttribute("fill",fill.toString());
            circle.setAttribute("stroke",strokeColor.toString());
            circle.setAttribute("stroke-width",strokeWidth.toString());
        
        svg.appendChild(circle);
        };
    }
    
    //This function dynamically creates an SVG ellipse.
    Ellipse(svg, cx, cy, rx, ry, fill, strokeColor, strokeWidth){
        if( 
            SVG_InputValidator.isValidCSSDimension_and_Unit(cx) == true &&
            SVG_InputValidator.isValidCSSDimension_and_Unit(cy) == true &&
            SVG_InputValidator.isValidCSSDimension_and_Unit(rx) == true &&
            SVG_InputValidator.isValidCSSDimension_and_Unit(ry) == true &&
            SVG_InputValidator.isValidRGBA(fill) == true &&
            SVG_InputValidator.isValidRGBA(strokeColor) == true &&
            SVG_InputValidator.isValidCSSDimension_and_Unit(strokeWidth) == true) {

            let ellipse = document.createElementNS(this.svgNamespace, "ellipse");
    
            ellipse.setAttribute("cx",cx);
            ellipse.setAttribute("cy",cy);
            ellipse.setAttribute("rx",rx);
            ellipse.setAttribute("ry",ry);
            ellipse.setAttribute("fill",fill);
            ellipse.setAttribute("stroke",strokeColor);
            ellipse.setAttribute("stroke-width",strokeWidth);
        
            svg.appendChild(ellipse);
        };
    }
    
    //This function dynamically creates an SVG line.
    Line(svg, x1, y1, x2, y2, strokeColor, strokeWidth){

        if( 
            SVG_InputValidator.isValidCSSDimension_and_Unit(x1) == true &&
            SVG_InputValidator.isValidCSSDimension_and_Unit(y1) == true &&
            SVG_InputValidator.isValidCSSDimension_and_Unit(x2) == true &&
            SVG_InputValidator.isValidCSSDimension_and_Unit(y2) == true &&
            SVG_InputValidator.isValidRGBA(strokeColor) == true &&
            SVG_InputValidator.isValidCSSDimension_and_Unit(strokeWidth) == true) {

            let line = document.createElementNS(this.svgNamespace, "line");
    
            line.setAttribute("x1",x1);
            line.setAttribute("y1",y1);
            line.setAttribute("x2",x2);
            line.setAttribute("y2",y2);
            line.setAttribute("stroke",strokeColor);
            line.setAttribute("stroke-width",strokeWidth);
        
            svg.appendChild(line);
        };
    }
    
    //This function dynamically creates an SVG path. This library only allows for straight lines, no curves.
    Path(svg, d, fill, strokeColor, strokeWidth){

        if( 
            SVG_InputValidator.isValidSVGPath(d) == true &&
            SVG_InputValidator.isValidRGBA(fill) == true &&
            SVG_InputValidator.isValidRGBA(strokeColor) == true &&
            SVG_InputValidator.isValidCSSDimension_and_Unit(strokeWidth) == true) {

            let path = document.createElementNS(this.svgNamespace, "path");
    
            path.setAttribute("d",d);
            path.setAttribute("fill",fill);
            path.setAttribute("stroke",strokeColor);
            path.setAttribute("stroke-width",strokeWidth);
        
            svg.appendChild(path);
        };
    }
    
    //This function dynamically creates an SVG polygon.
    //It does not test if it is closed or not. It only accepts points.
    Polygon(svg, points, fill, strokeColor, strokeWidth){

        if( 
            SVG_InputValidator.isValidSVGPolyline(points) == true &&
            SVG_InputValidator.isValidRGBA(fill) == true &&
            SVG_InputValidator.isValidRGBA(strokeColor) == true &&
            SVG_InputValidator.isValidCSSDimension_and_Unit(strokeWidth) == true) {

            let polygon = document.createElementNS(this.svgNamespace, "polygon");
    
            polygon.setAttribute("points",points);
            polygon.setAttribute("fill",fill);
            polygon.setAttribute("stroke",strokeColor);
            polygon.setAttribute("stroke-width",strokeWidth);
        
            svg.appendChild(polygon);
        };
    }
    
    //This function dynamically creates an SVG polyline. It should be used for only lines. It is essentially a polygonal chain.
    Polyline(svg, points, fill, strokeColor, strokeWidth){

        if( 
            SVG_InputValidator.isValidSVGPolyline(points) == true &&
            SVG_InputValidator.isValidRGBA(fill) == true &&
            SVG_InputValidator.isValidRGBA(strokeColor) == true &&
            SVG_InputValidator.isValidCSSDimension_and_Unit(strokeWidth) == true) {

            let polyline = document.createElementNS(this.svgNamespace, "polyline");
    
            polyline.setAttribute("points",points);
            polyline.setAttribute("fill",fill);
            polyline.setAttribute("stroke",strokeColor);
            polyline.setAttribute("stroke-width",strokeWidth);
        
            svg.appendChild(polyline);
        };
    }
    
        //This function dynamically creates an SVG rectangle. A rectangle is a special case of a polygon.
        Rectangle(svg, x, y, width, height, fill, strokeColor, strokeWidth){

            if(
                SVG_InputValidator.isValidCSSDimension_and_Unit(x) == true &&
                SVG_InputValidator.isValidCSSDimension_and_Unit(y) == true &&
                SVG_InputValidator.isValidCSSDimension_and_Unit(width) == true &&
                SVG_InputValidator.isValidCSSDimension_and_Unit(height) == true &&
                SVG_InputValidator.isValidRGBA(fill) == true &&
                SVG_InputValidator.isValidRGBA(strokeColor) == true &&
                SVG_InputValidator.isValidCSSDimension_and_Unit(strokeWidth) == true) {
                            
                let rect = document.createElementNS(this.svgNamespace, "rect");
    
                rect.setAttribute("x",x);
                rect.setAttribute("y",y);
                rect.setAttribute("width",width);
                rect.setAttribute("height",height);
                rect.setAttribute("fill",fill);
                rect.setAttribute("stroke",strokeColor);
                rect.setAttribute("stroke-width",strokeWidth);
        
                svg.appendChild(rect);
        };
    }
    
    //Text Elements: <text>
    Text(svg, x, y, textContent, fontFamily, fontSize,  Color){
        if(
            SVG_InputValidator.isValidCSSDimension_and_Unit(x) == true &&
            SVG_InputValidator.isValidCSSDimension_and_Unit(y) == true &&
            SVG_InputValidator.isValidFontFamily(fontFamily) == true &&
            SVG_InputValidator.isValidCSSDimension_and_Unit(fontSize) == true &&
            SVG_InputValidator.isValidRGBA(Color) == true) {

            let text = document.createElementNS(this.svgNamespace, "text");
    
            text.setAttribute("x", x);
            text.setAttribute("y", y);
            text.setAttribute('font-family',fontFamily);
            text.setAttribute('font-size',fontSize);
            text.setAttribute('color',Color);
            text.textContent = textContent.toString();
        
            svg.appendChild(text);
        };
    
    }
}
// Usage: Units are necessary!
/*
let creator = new SvgElementCreator();
let svg = document.getElementById('mySvg');

let circle = creator.Circle(svg, '50px', '50px', '20px', 'rgba(255,0,0,1)', 'rgba(0,0,0,1)', '2px');
let ellipse = creator.Ellipse(svg, '50px', '50px', '30px', '20px', 'rgba(255,0,0,1)', 'rgba(0,0,0,1)', '2px');
let line = creator.Line(svg, '10px', '10px', '40px', '40px', 'rgba(255,0,0,1)', '2px');
let rectangle = creator.Rectangle(svg, '50px', '50px', '80px', '40px', 'rgba(255,0,0,1)', 'rgba(0,0,0,1)', '2px');
let path = creator.Path(svg, "M10 20 L30 40", 'rgba(255,0,0,1)', 'rgba(0,0,0,1)', '2px');
let polygon = creator.Polygon(svg, "50,50 70,70 60,90", 'rgba(255,0,0,1)', 'rgba(0,0,0,1)', '2px');
let polyline = creator.Polyline(svg, "60,110 70,120 80,130", 'rgba(255,0,0,1)', 'rgba(0,0,0,1)', '2px');
let text = creator.Text(svg, '50px', '50px', "Hello SVG",'Arial', '20px', 'rgba(255,0,0,1)');
*/