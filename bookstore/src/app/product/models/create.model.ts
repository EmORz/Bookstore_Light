export class CreateModel {
    constructor(
        public title: string,
        public author: string,
        public price: number,
        public quantity: number,
        public description: string,  
        public totalMone?: number,
        public picture?: string
    ){}
}