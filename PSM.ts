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

function clacCross(a:Point,b:Point,c:Point,d:Point){
    let result:Point;
    let x:number,y:number;
    x = ((c.getY()-a.getY())*(a.getX()-b.getX())*(c.getX()-d.getX())+(a.getX())*(a.getY()-b.getY())*(c.getX()-d.getX())-c.getX()*(c.getY()-d.getY())*(a.getX()-b.getX()))/((a.getY()-b.getY())*(c.getX()-d.getX())-(a.getX()-b.getX())*(c.getY()-d.getY()));
    y = x*(a.getY()-b.getY())/(a.getX()-b.getX()) + a.getY()-a.getX()*(a.getY()-b.getY())/(a.getX()-b.getX());
    result = new Point(x,y);
    return result;
}

const data = fs.readFileSync('PSMrawdata.csv');
const records = parse(data);
let all_num=0;
for (const record of records) {
    all_num++;
}

all_num--;

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

let max_p_idx1=0,max_p_idx2=0,comp_p_idx1=0,comp_p_idx2=0,ideal_p_idx1=0,ideal_p_idx2=0,min_p_idx1=0,min_p_idx2=0;

for(let i=0;i<11;i++){
    if(isCross(too_exp[i],too_exp[i+1],think_cheap[i],think_cheap[i+1])){
        max_p_idx1=i;
        max_p_idx2=i+1;
    }

    if(isCross(think_exp[i],think_exp[i+1],think_cheap[i],think_cheap[i+1])){
        comp_p_idx1=i;
        comp_p_idx2=i+1;
        
    }

    if(isCross(too_exp[i],too_exp[i+1],too_cheap[i],too_cheap[i+1])){
        ideal_p_idx1=i;
        ideal_p_idx2=i+1;
    }
    
    if(isCross(think_exp[i],think_exp[i+1],too_cheap[i],too_cheap[i+1])){
        min_p_idx1=i;
        min_p_idx2=i+1;
    }
}
console.log("最高価格"+clacCross(too_exp[max_p_idx1],too_exp[max_p_idx2],think_cheap[max_p_idx1],think_cheap[max_p_idx2]).getX().toFixed()+"円");
console.log("妥協価格"+clacCross(think_exp[comp_p_idx1],think_exp[comp_p_idx2],think_cheap[comp_p_idx1],think_cheap[comp_p_idx2]).getX().toFixed()+"円");
console.log("理想価格"+clacCross(too_exp[ideal_p_idx1],too_exp[ideal_p_idx2],too_cheap[ideal_p_idx1],too_cheap[ideal_p_idx2]).getX().toFixed()+"円");
console.log("最低品質保証価格"+clacCross(think_exp[min_p_idx1],think_exp[min_p_idx2],too_cheap[min_p_idx1],too_cheap[min_p_idx2]).getX().toFixed()+"円");

// 実行結果

// 最高価格292円
// 妥協価格279円
// 理想価格265円
// 最低品質保証価格247円
    