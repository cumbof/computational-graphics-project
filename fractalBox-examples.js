
/*  
 *  EXAMPLE 1:
 *  this example returns a 2D d-fractal-square with three depth levels
 *  (5 is the initial square length)
 */
var fSimplex2D = fractalBox(2,3,5)
fSimplex2D.draw();



/*
 *  EXAMPLE 2:
 *  this example returns a 3D d-fractal-cube with two depth levels
 *  (5 is the initial cube length)
 */
var fSimplex3D = fractalBox(3,2,5)
fSimplex3D.draw();