import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

class Point{
    private x:number;
    private y:number;

    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }

    getX():number{
        return this.x;
    }

    getY():number {
        return this.y;
    }

    
}

function isCross(a:Point,b:Point,c:Point,d:Point){
    let s = (a.getX()-b.getX())*(c.getY()-a.getY())-(a.getY()-b.getY())*(c.getX()-a.getX());
    let t = (a.getX()-b.getX())*(d.getY()-a.getY())-(a.getY()-b.getY())*(d.getX()-a.getX());

    if(s*t>0) return false;

    s = (c.getX()-d.getX())*(a.getY()-c.getY())-(c.getY()-d.getY())*(a.getX()-c.getX());
    t = (c.getX()-d.getX())*(b.getY()-c.getY())-(c.getY()-d.getY())*(b.getX()-c.getX());

    if(s*t>0) return false;

    return true;
}

const data = fs.readFileSync('PSMrawdata.csv');
const records = parse(data);
let all_num=0;
for (const record of records) {
    console.log(record);
    all_num++;
}

all_num--;
console.log(all_num);
let graph: number[][] = new Array();
let tmp = 50;


for( let i=0;i<12;i++){
    graph[i]= new Array();
    for(let j=0;j<5;j++){
        if(j===0) graph[i][0] = tmp;
        else graph[i][j] = 0;
    }
    tmp+=50;
}




for(let i=0;i<12;i++){
    for(let j=1;j<=all_num;j++){
    if(records[j][1]<=graph[i][0]){
        graph[i][1]++;
    }

    if(records[j][2]>=graph[i][0]){
        graph[i][2]++;
    }

    if(records[j][3]<=graph[i][0]){
        graph[i][3]++;
    }

    if(records[j][4]>=graph[i][0]){
        graph[i][4]++;
        }
    }
}

for(let i=0;i<12;i++){
    for(let j=1;j<=4;j++){
        graph[i][j]/=all_num;
        graph[i][j]*=100;
        graph[i][j]=Number(graph[i][j].toFixed(1));
    }
}

for(const num of graph){
    console.log(num);
}

let too_cheap:Point[] = new Array();
let think_cheap:Point[] = new Array();
let think_exp:Point[] = new Array();
let too_exp:Point[] = new Array();

for(let i=0;i<12;i++){
    think_exp[i] = new Point(graph[i][0],graph[i][1]);
    think_cheap[i] = new Point(graph[i][0],graph[i][2]);
    too_exp[i] = new Point(graph[i][0],graph[i][3]);
    too_cheap[i] = new Point(graph[i][0],graph[i][4]);
}
console.log("安いと思う");
for(const point of think_exp){
    console.log(point.getX()+" "+point.getY());
}
console.log("高いと思う");
for(const point of think_cheap){
    console.log(point.getX()+" "+point.getY());
}
console.log("高すぎる");
for(const point of too_exp){
    console.log(point.getX()+" "+point.getY());
}
console.log("安すぎる");
for(const point of too_cheap){
    console.log(point.getX()+" "+point.getY());
}

for(let i=0;i<11;i++){
    if(isCross(too_exp[i],too_exp[i+1],think_cheap[i],think_cheap[i+1])){
        console.log(i+" "+(i+1));
    }
}


    