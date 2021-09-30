import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {validate} from "class-validator";

import {usuarios} from "../entity/User_entity";
import makeid from "../helpers/RandomPassword";

class UserController {

    async all(req: Request, res: Response) {
        const userRepository = getRepository(usuarios);
        let users = await userRepository.find({});
        return res.send(users);
    }

    async one(req: Request, res: Response) {
        const {id} = req.params;
        
        const userRepository = getRepository(usuarios);

        try {
            const user = await userRepository.findOneOrFail(id);
            return res.send(user);
        } catch (e) {
            return res.status(404).json({ message: 'Nor result'});
        }
    }

    async create(req: Request, res: Response) {
        const userRepository = getRepository(usuarios);

        const {Nombre, Email} = req.body;

        const password = makeid(5);
        const user = new usuarios(Nombre, Email);
        const errors = await validate(user);
        if (errors.length > 0) return res.status(400).json(errors);
        
        try {
            await userRepository.save(user);
            
            return res.status(201).json(password);
        } catch (e) {
            return res.status(409).json({ message: 'User already exist'});
        }
    }

    async update(req: Request, res: Response) {
        const userRepository = getRepository(usuarios);

        const {id} = req.params;
        const {Nombre, Email} = req.body;

        let user: usuarios; 

        try {
            user = await userRepository.findOneOrFail(id);
            user.Nombre = Nombre;
            user.Email = Email;
        } catch (e) {
            return res.status(404).json({ message: 'Not found result' });
        }
        
        const errors = await validate(user);
        
        if(errors.length > 0) return res.status(400).json(errors);

        try {
            await userRepository.save(user);
        } catch (e) {
            return res.status(409).json({ message: 'User already in use' });
        }

        return res.status(201).json({ message: 'User update' })
    }

    async remove(req: Request, res: Response) {
        const userRepository = getRepository(usuarios);
        const {id} = req.params;
        let user: usuarios;
        try {
            user = await userRepository.findOneOrFail(id);
            await userRepository.remove(user);
        } catch (e) {
            return res.status(404).json({ message: 'Not found result'});
        }

        return res.status(201).json({ message: 'User deleted' });
    }
}

export default UserController