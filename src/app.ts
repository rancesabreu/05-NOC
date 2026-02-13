import { envs } from './config/plugins/envs.plugin.ts';
import { Server } from './presentation/server.js';



(async() => {
    main(); 
}) ();

function main() {
    // Server.start();
    console.log( envs );
}