import * as bcrypt from "bcrypt";

class PasswordService {
    public hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (error, hash) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(hash);
                }
            });
        });
    }

    public comparePassword(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hashedPassword, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

export const passwordService = new PasswordService();
