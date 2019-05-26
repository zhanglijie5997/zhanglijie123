
export class apiError extends Error {
    /**
     * 
     * @param name     名称
     * @param message  信息
     * @param status   状态码
     */
    constructor(name: string, message: string, public status: number) {
        super();
       
        this.name = name;
        this.message = message;
        this.status = status;
    }
}


export class publicInfo {
    constructor(message: string, public status: number, public data?: any) {

    }
}