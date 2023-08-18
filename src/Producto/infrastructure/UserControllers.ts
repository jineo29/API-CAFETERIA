//V1LLO29
import { Request, Response } from "express";
import { CreateUser } from "../application/CreateUser";
import { GetUser } from "../application/GetUser";
import { GetUserid } from "../application/GetUserid";
import { DelUserId } from "../application/DeleteUser";
import { PutUser } from "../application/PutUser";



export class ProductosController {
  constructor(
    readonly createUser: CreateUser,
    readonly getuser: GetUser,
    readonly getuserid: GetUserid,
    readonly deluserid: DelUserId,
    readonly putuser: PutUser
  ) {}


  put = async (req: Request, res: Response) => {
    try {
      const { Nombre, Telefono, Correo } = req.body;
      const dataproducto = await this.putuser.putUser(Nombre, Telefono, Correo);
      res.status(200).json(dataproducto);
    } catch (error) {
      res.status(500).json({ error: "servidor error" });
    }
  };

  deleteById = async (req: Request, res: Response) => {
    try {
      console.log("Este es el producto");
      const { Correo } = req.params;
      const consul = await this.deluserid.Userid(String(Correo));
      console.log("Esto contiene nuestra base de datos", consul);
      res.status(200).json(consul);
    } catch {
      res.status(500).json({ error: "intenta de nuevo" });
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const consul = await this.getuser.AllProducto();
       console.log("Esto contiene nuestra base de datos");
      res.status(200).json(consul);
    } catch {
      res.status(500).json({ error: "intenta de nuevo" });
    }
  };

  getProductoid = async (req: Request, res: Response) => {
    try {
      console.log("Este es el producto");
      const { Correo } = req.params;
      const consul = await this.getuserid.Productoid(String(Correo));
      console.log("Esto contiene nuestra base de datos", consul);
      res.status(200).json(consul);
    } catch {
      res.status(500).json({ error: "intenta de nuevo" });
    }
  };
  create = async (req: Request, res: Response) => {
    try {
      const { Nombre, Telefono, Correo } = req.body;

      const onlyLetters = /^[A-Za-z]+$/.test(Nombre);
      if (!onlyLetters) {
        return res
          .status(400)
          .json({ error: "En Nombre no debe llevar Letras" });
      }
      const onlyNumbers = /^[0-9]+$/.test(Telefono);
      if (!onlyNumbers) {
        return res
          .status(400)
          .json({ error: "En Telefono solo deben ser números" });
      }
      const onlyCorreo = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(
        Correo
      );
      if (!onlyCorreo) {
        return res.status(400).json({ error: "El Correo esta Mal Escrito" });
      }
      const dataproducto = await this.createUser.createProducto(
        Nombre,
        Telefono,
        Correo
      );
      res.status(200).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  };
}
