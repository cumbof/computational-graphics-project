
/*  
 *  EXAMPLE 1:
 *  this example returns a 2D d-fractal-simplex with three depth levels
 *  (5 is the initial triangle length)
 */
var fSimplex2D = sierpinski(2,3,5)
fSimplex2D.draw();



/*
 *  EXAMPLE 2:
 *  this example returns a 3D d-fractal-simplex with three depth levels
 *  (5 is the initial triangle length)
 */
var fSimplex3D = sierpinski(3,3,5)
fSimplex3D.draw();