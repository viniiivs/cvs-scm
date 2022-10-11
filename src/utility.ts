import { window } from "vscode";

export async function runCvsBoolCmd(cvsCommand: string, path: string): Promise<boolean>  {
    const { exec } = require("child_process");
    return await new Promise<boolean>((resolve, reject) => {
        exec(cvsCommand, {cwd: path}, (error: any, stdout: string, stderr: any) => {
            if (error) {
                window.showErrorMessage("CVS repository error");
                console.log(error);
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
}

export async function runCvsStrCmd(cvsCommand: string, path: string, ignoreErr: boolean = false, getStderror: boolean = false ): Promise<string>  {
    const { exec } = require("child_process");
    return await new Promise<string>((resolve, reject) => {
        exec(cvsCommand, {cwd: path}, (error: any, stdout: string, stderr: string) => {
            if (!ignoreErr && error) {
                window.showErrorMessage("CVS repository error");
                console.log(error);
                reject(false);
            } else {
                if (getStderror) {
                    resolve(stdout + stderr);
                } else {
                    resolve(stdout);
                }
            }
        });
    });
}