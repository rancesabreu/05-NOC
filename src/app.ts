import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';



(async() => {
    main(); 
}) ();

async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    // Crear una colección = tables, documentos = registro
    const newLog = await LogModel.create({
        message: 'Test message desde MongoDB',
        origin: 'app.ts',
        level: 'low',
    });

    await newLog.save();

    // Server.start();
}   