/*
* dim: dimension parameter (values: 2 or 3)
* levels: number of fractal levels
* modelLength: initial square simplex length
*/

function fractalBox(dim, levels, modelLength) {
	if (dim === undefined || dim === 0)
		return undefined;
	else if (dim === 1 && (modelLength===undefined || modelLength===0))
		return undefined;
	else if (dim === 1 && modelLength>0)
		return (new lar.Model([[0,0,0],[0,modelLength,0]], [[0,1]]));
	else if (dim === 2 && (modelLength===undefined || modelLength===0))
		return undefined;
	else if (dim === 2 && modelLength>0 && (levels === 0 || levels === undefined))
		return (new lar.Model([[0,0,0],[modelLength,0,0],[0,modelLength,0],[modelLength,modelLength,0]], [[0,1,2,3]]));
	else if (dim === 2 && modelLength>0 && levels>0)
		return fractalBox2D(dim, levels, modelLength);
	else if (dim === 3 && (modelLength===undefined || modelLength===0))
		return undefined;
	else if (dim === 3 && modelLength>0 && (levels === 0 || levels === undefined)) {
		return simpleFractalBox3D(dim, modelLength);
	}
	else if (dim === 3 && modelLength>0 && levels>0)
		return fractalBox3D(dim, levels, modelLength);

	return undefined;
}

function fractalBox2D(dim, levels, modelLength) {
	if (dim === 2) {
		var V = [[0,0,0],[modelLength,0,0],[0,modelLength,0],[modelLength,modelLength,0]];
		var C = [[0,1,2,3]];
		var lastVertex = 3;

		for (var l=0; l<levels; l++) {
			var cellsTMP = copyArr(C);

			for (var c=0; c<C.length; c++) {
				var index0 = C[c][0];
				var index1 = C[c][1];
				var index2 = C[c][2];
				var index3 = C[c][3];

				var medianPoint01_0 = [V[index0][0]+((V[index1][0] - V[index0][0])/3), (V[index0][1]), 0]; //0 - 1 : 0
				var medianPoint01_1 = [V[index0][0]+(2*((V[index1][0] - V[index0][0])/3)), (V[index0][1]), 0]; //0 - 1 : 1
				var medianPoint13_0 = [(V[index1][0]), V[index1][1]+((V[index3][1] - V[index1][1])/3), 0]; //1 - 3 : 0
				var medianPoint13_1 = [(V[index1][0]), V[index1][1]+(2*((V[index3][1] - V[index1][1])/3)), 0]; //1 - 3 : 1
				var medianPoint02_0 = [(V[index0][0]), V[index0][1]+((V[index2][1] - V[index0][1])/3), 0]; //0 - 2 : 0
				var medianPoint02_1 = [(V[index0][0]), V[index0][1]+(2*((V[index2][1] - V[index0][1])/3)), 0]; //0 - 2 : 1
				var medianPoint23_0 = [V[index2][0]+((V[index3][0] - V[index2][0])/3), (V[index2][1]), 0]; //2 - 3 : 0
				var medianPoint23_1 = [V[index2][0]+(2*((V[index3][0] - V[index2][0])/3)), (V[index2][1]), 0]; //2 - 3 : 1
				var pointK = [medianPoint01_0[0], medianPoint02_0[1], 0];
				var pointJ = [medianPoint01_1[0], medianPoint02_0[1], 0];
				var pointV = [medianPoint01_1[0], medianPoint02_1[1], 0];
				var pointW = [medianPoint01_0[0], medianPoint02_1[1], 0];

				V.push(medianPoint01_0);
				V.push(medianPoint01_1);
				V.push(medianPoint13_0);
				V.push(medianPoint13_1);
				V.push(medianPoint02_0);
				V.push(medianPoint02_1);
				V.push(medianPoint23_0);
				V.push(medianPoint23_1);
				V.push(pointK);
				V.push(pointJ);
				V.push(pointV);
				V.push(pointW);
				lastVertex = lastVertex + 12;

				var cell0 = [index0, lastVertex-11, lastVertex-7, lastVertex-3];
				var cell1 = [lastVertex-10, index1, lastVertex-2, lastVertex-9];
				var cell2 = [lastVertex-3, lastVertex-2, lastVertex, lastVertex-1];
				var cell3 = [lastVertex-6, lastVertex, index2, lastVertex-5];
				var cell4 = [lastVertex-1, lastVertex-8, lastVertex-4, index3];

				cellsTMP.push(cell0);
				cellsTMP.push(cell1);
				cellsTMP.push(cell2);
				cellsTMP.push(cell3);
				cellsTMP.push(cell4);

				cellsTMP.reverse();
				cellsTMP.pop();
				cellsTMP.reverse();
			}
			C = copyArr(cellsTMP);
		}

		return (new lar.Model(V,C));
	}
	return undefined;
}

function simpleFractalBox3D(dim, modelLength) {
	if (dim === 3) {
		var V = [[0,0,0],[modelLength,0,0],[0,modelLength,0],[modelLength,modelLength,0],[0,0,modelLength],[modelLength,0,modelLength],[0,modelLength,modelLength],[modelLength,modelLength,modelLength]];
		var C = [[0,1,2,3,4,5,6,7]];
		return (new lar.Model(V,C));
	}
	return undefined;
}

function fractalBox3D(dim, levels, modelLength) {
	if (dim === 3) {

		var V = [[0,0,0],[modelLength,0,0],[0,modelLength,0],[modelLength,modelLength,0],[0,0,modelLength],[modelLength,0,modelLength],[0,modelLength,modelLength],[modelLength,modelLength,modelLength]];
		var C = [[0,1,2,3,4,5,6,7]];

		var cubes3D = [[V,C]];
		var cubes3dTMP = new Array();
		for (var l=0; l<levels; l++) {
			var cubes3dTMP = copyArr(cubes3D);

			for (var i=0; i<cubes3D.length; i++) {
				var cube3D = cubes3D[i];
				var vertices = cube3D[0];

				//////////////////////////////////////////////////////

				var p8 = [vertices[0][0]+((vertices[1][0] - vertices[0][0])/3), (vertices[0][1]), vertices[0][2]]; // 0 - 1 : 0
				var p9 = [(vertices[0][0]), vertices[0][1]+((vertices[2][1] - vertices[0][1])/3), vertices[0][2]]; // 0 - 2 : 0
				var p10 = [p8[0], p9[1], p8[2]]; // k
				var p11 = [vertices[0][0], vertices[0][1], vertices[0][2]+((vertices[4][2]-vertices[0][2])/3)]; // index0_z0
				var p12 = [p8[0], p8[1], p8[2]+((vertices[4][2]-p8[2])/3)]; // 0 - 1 : 0z0
				var p13 = [p9[0], p9[1], p9[2]+((vertices[4][2]-p9[2])/3)]; // 0 - 2 : 0z0
				var p14 = [p10[0], p10[1], p10[2]+((vertices[4][2]-p10[2])/3)]; // kz0

				var v0 = new Array();
				v0.push(vertices[0], p8, p9, p10, p11, p12, p13, p14);

				//////////////////////////////////////////////////////

				var p15 = [vertices[0][0]+(2*((vertices[1][0] - vertices[0][0])/3)), (vertices[0][1]), vertices[1][2]]; // 0 - 1 : 1
				var p16 = [p15[0], p9[1], p15[2]]; // j
				var p17 = [(vertices[1][0]), vertices[1][1]+((vertices[3][1] - vertices[1][1])/3), vertices[1][2]]; // 1 - 3 : 0
				var p18 = [p15[0], p15[1], p15[2]+((vertices[4][2]-p15[2])/3)]; // 0 - 1 : 1z0
				var p19 = [vertices[1][0], vertices[1][1], vertices[1][2]+((vertices[4][2]-vertices[1][2])/3)]; // index1_z0
				var p20 = [p16[0], p16[1], p16[2]+((vertices[4][2]-p16[2])/3)]; // jz0
				var p21 = [p17[0], p17[1], p17[2]+((vertices[4][2]-p17[2])/3)]; // 1 - 3 : 0z0

				var v1 = new Array();
				v1.push(p15, vertices[1], p16, p17, p18, p19, p20, p21);

				//////////////////////////////////////////////////////

				var p22 = [(vertices[0][0]), vertices[0][1]+(2*((vertices[2][1] - vertices[0][1])/3)), vertices[0][2]]; // 0 - 2 : 1
				var p23 = [p8[0], p22[1], p8[2]]; // w
				var p24 = [p15[0], p22[1], p15[2]]; // v
				var p25 = [p23[0], p23[1], p23[2]+((vertices[4][2]-p23[2])/3)]; // wz0
				var p26 = [p24[0], p24[1], p24[2]+((vertices[4][2]-p24[2])/3)]; // vz0

				var v2 = new Array();
				v2.push(p10, p16, p23, p24, p14, p20, p25, p26);

				//////////////////////////////////////////////////////

				var p27 = [vertices[2][0]+((vertices[3][0] - vertices[2][0])/3), (vertices[2][1]), vertices[2][2]]; // 2 - 3 : 0
				var p28 = [p22[0], p22[1], p22[2]+((vertices[4][2]-p22[2])/3)]; // 0 - 2 : 1z0
				var p29 = [vertices[2][0], vertices[2][1], vertices[2][2]+((vertices[4][2]-vertices[2][2])/3)]; // index2_z0
				var p30 = [p27[0], p27[1], p27[2]+((vertices[4][2]-p27[2])/3)]; // 2 - 3 : 0z0

				var v3 = new Array();
				v3.push(p22, p23, vertices[2], p27, p28, p25, p29, p30);

				//////////////////////////////////////////////////////

				var p31 = [(vertices[1][0]), vertices[1][1]+(2*((vertices[3][1] - vertices[1][1])/3)), vertices[1][2]]; // 1 - 3 : 1
				var p32 = [vertices[2][0]+(2*((vertices[3][0] - vertices[2][0])/3)), (vertices[2][1]), vertices[2][2]]; // 2 - 3 : 1
				var p33 = [p31[0], p31[1], p31[2]+((vertices[4][2]-p31[2])/3)]; // 1 - 3 : 1z0
				var p34 = [p32[0], p32[1], p32[2]+((vertices[4][2]-p32[2])/3)]; // 2 - 3 : 1z0
				var p35 = [vertices[3][0], vertices[3][1], vertices[3][2]+((vertices[4][2]-vertices[3][2])/3)]; // index3_z0

				var v4 = new Array();
				v4.push(p24, p31, p32, vertices[3], p26, p33, p34, p35);

				//////////////////////////////////////////////////////

				var p36 = [vertices[0][0], vertices[0][1], vertices[0][2]+(2*((vertices[4][2] - vertices[0][2])/3))]; // index0_z1
				var p37 = [vertices[0][0]+((vertices[1][0] - vertices[0][0])/3), (vertices[0][1]), p36[2]]; // 0 - 1 : 0z1
				var p38 = [(vertices[0][0]), vertices[0][1]+((vertices[2][1] - vertices[0][1])/3), p36[2]]; // 0 - 2 : 0z1
				var p39 = [p37[0], p38[1], p37[2]]; // kz1
				var p40 = [vertices[0][0], vertices[0][1], (vertices[4][2])]; // index0_z2
				var p41 = [p37[0], p37[1], (vertices[4][2])]; // 0 - 1 : 0z2
				var p42 = [p38[0], p38[1], (vertices[4][2])]; // 0 - 2 : 0z2
				var p43 = [p39[0], p39[1], (vertices[4][2])]; // kz2

				var v5 = new Array();
				v5.push(p36, p37, p38, p39, p40, p41, p42, p43);

				//////////////////////////////////////////////////////

				var p44 = [vertices[0][0]+(2*((vertices[1][0] - vertices[0][0])/3)), (vertices[0][1]), vertices[0][2]+(2*((vertices[4][2] - vertices[0][2])/3))]; // 0 - 1 : 1z1
				var p45 = [vertices[1][0], vertices[1][1], p44[2]]; // index1_z1
				var p46 = [(vertices[1][0]), vertices[1][1]+((vertices[3][1] - vertices[1][1])/3), p44[2]]; // 1 - 3 : 0z1
				var p47 = [p44[0], p46[1], p44[2]]; // jz1
				var p48 = [(vertices[1][0]), vertices[1][1]+((vertices[3][1] - vertices[1][1])/3), vertices[4][2]]; // 1 - 3 : 0z2
				var p49 = [p44[0], p44[1], vertices[4][2]]; // 0 - 1 : 1z2
				var p50 = [p47[0], p47[1], vertices[4][2]]; // jz2

				var v6 = new Array();
				v6.push(p44, p45, p47, p46, p49, vertices[5], p50, p48);

				//////////////////////////////////////////////////////

				var p51 = [p39[0], vertices[0][1]+(2*((vertices[2][1]-vertices[0][1])/3)), p39[2]]; // wz1
				var p52 = [vertices[0][0]+(2*((vertices[1][0] - vertices[0][0])/3)), p51[1], p51[2]]; // vz1
				var p53 = [p51[0], p51[1], vertices[4][2]]; // wz2
				var p54 = [p52[0], p52[1], vertices[4][2]]; // vz2

				var v7 = new Array();
				v7.push(p39, p47, p51, p52, p43, p50, p53, p54);

				//////////////////////////////////////////////////////

				var p55 = [vertices[2][0]+((vertices[3][0] - vertices[2][0])/3), (vertices[2][1]), p51[2]]; // 2 - 3 : 0z1
				var p56 = [p22[0], p22[1], p22[2]+(2*((vertices[4][2]-p22[2])/3))]; // 0 - 2 : 1z1
				var p57 = [vertices[2][0], vertices[2][1], vertices[2][2]+(2*((vertices[4][2]-vertices[2][2])/3))]; // index2_z1
				var p58 = [p27[0], p27[1], vertices[6][2]]; // 2 - 3 : 0z2
				var p59 = [p56[0], p56[1], vertices[6][2]]; // 0 - 2 : 1z2

				var v8 = new Array();
				v8.push(p56, p51, p57, p55, p59, p53, vertices[6], p58);

				//////////////////////////////////////////////////////

				var p60 = [(vertices[1][0]), vertices[1][1]+(2*((vertices[3][1] - vertices[1][1])/3)), p57[2]]; // 1 - 3 : 1z1
				var p61 = [vertices[2][0]+(2*((vertices[3][0] - vertices[2][0])/3)), (vertices[2][1]), p57[2]]; // 2 - 3 : 1z1
				var p62 = [p31[0], p31[1], vertices[7][2]]; // 1 - 3 : 1z2
				var p63 = [p32[0], p32[1], vertices[7][2]]; // 2 - 3 : 1z2
				var p64 = [vertices[3][0], vertices[3][1], vertices[3][2]+(2*((vertices[4][2]-vertices[3][2])/3))]; // index3_z1

				var v9 = new Array();
				v9.push(p52, p60, p61, p64, p54, p62, p63, vertices[7]);

				//////////////////////////////////////////////////////

				var v10 = new Array();
				v10.push(p13, p14, p28, p25, p38, p39, p56, p51);

				//////////////////////////////////////////////////////

				var v11 = new Array();
				v11.push(p20, p21, p26, p33, p47, p46, p52, p60);

				//////////////////////////////////////////////////////

				var v12 = new Array();
				v12.push(p25, p26, p30, p34, p51, p52, p55, p61);

				//////////////////////////////////////////////////////

				var v13 = new Array();
				v13.push(p12, p18, p14, p20, p37, p44, p39, p47);

				//////////////////////////////////////////////////////

				var c = new Array();
				c.push([0,1,2,3,4,5,6,7]);

				cubes3dTMP.push([v0, c]);
				cubes3dTMP.push([v1, c]);
				cubes3dTMP.push([v2, c]);
				cubes3dTMP.push([v3, c]);
				cubes3dTMP.push([v4, c]);
				cubes3dTMP.push([v5, c]);
				cubes3dTMP.push([v6, c]);
				cubes3dTMP.push([v7, c]);
				cubes3dTMP.push([v8, c]);
				cubes3dTMP.push([v9, c]);
				cubes3dTMP.push([v10, c]);
				cubes3dTMP.push([v11, c]);
				cubes3dTMP.push([v12, c]);
				cubes3dTMP.push([v13, c]);

				cubes3dTMP.reverse();
				cubes3dTMP.pop();
				cubes3dTMP.reverse();
			}


			cubes3D = copyArr(cubes3dTMP);
		}

		var model = mergeCubes3D(cubes3D);
		return model;

	}
	return undefined
}

function mergeCubes3D(simplexes3D) {
	var modelV = new Array();
	var modelC = new Array();

	for (var i=0; i<simplexes3D.length; i++) {
		var C = simplexes3D[i][1];
		for (var c=0; c<C.length; c++) {
			var cellTMP = [];
			for (var p=0; p<C[c].length; p++) {
				cellTMP.push(C[c][p] + modelV.length);
			}
			modelC.push(cellTMP);
		}

		var V = simplexes3D[i][0];
			for (var v=0; v<V.length; v++)
				modelV.push(V[v]);
	}

	return (new lar.Model(modelV, modelC));
}

function copyArr(arr) {
	var result = [];
	for (var i=0; i<arr.length; i++) {
		result.push(arr[i]);
	}
	return result;
}