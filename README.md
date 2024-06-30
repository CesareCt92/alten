<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>README - Progetto Laravel React</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 800px;
            margin: auto;
            background: white;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1, h2, h3 {
            color: #333;
        }
        pre {
            background: #f4f4f4;
            padding: 10px;
            border: 1px solid #ddd;
            overflow-x: auto;
        }
        code {
            font-family: "Courier New", Courier, monospace;
            background: #f4f4f4;
            padding: 2px 4px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Progetto Laravel React</h1>
        <h2>Prerequisiti</h2>
        <p>Prima di iniziare, assicurati di avere i seguenti requisiti:</p>
        <ul>
            <li>Hai installato Git.</li>
            <li>Hai installato Node.js e npm.</li>
            <li>Hai installato Composer.</li>
            <li>Hai installato PHP.</li>
            <li>Hai installato MySQL o un altro database supportato.</li>
        </ul>
        <h2>Installazione</h2>
        <p>Segui questi passaggi per configurare e avviare il progetto:</p>
        <h3>1. Clonare il repository</h3>
        <pre><code>git clone &lt;url-del-repository&gt;
cd &lt;directory-del-repository&gt;</code></pre>
        <h3>2. Creare un nuovo database</h3>
        <p>Crea un database vuoto per il progetto utilizzando il tuo strumento di gestione del database preferito (es. phpMyAdmin, MySQL Workbench).</p>
        <h3>3. Configurare le variabili d'ambiente</h3>
        <p>Copia il file <code>.env.example</code> in un nuovo file <code>.env</code>:</p>
        <pre><code>cp .env.example .env</code></pre>
        <p>Apri il file <code>.env</code> e aggiorna le seguenti righe con le informazioni del tuo database:</p>
        <pre><code>DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nome_del_tuo_database
DB_USERNAME=tuo_username_del_database
DB_PASSWORD=tua_password_del_database</code></pre>
        <h3>4. Installare le dipendenze</h3>
        <p>Installa le dipendenze npm:</p>
        <pre><code>npm install</code></pre>
        <p>Compila le risorse front-end:</p>
        <pre><code>npm run dev</code></pre>
        <p>Installa le dipendenze di Composer:</p>
        <pre><code>composer install</code></pre>
        <h3>5. Configurare l'applicazione</h3>
        <p>Esegui le migrazioni del database:</p>
        <pre><code>php artisan migrate</code></pre>
        <p>Genera la chiave dell'applicazione:</p>
        <pre><code>php artisan key:generate</code></pre>
        <h3>6. Avviare l'applicazione</h3>
        <p>Avvia il server di sviluppo:</p>
        <pre><code>php artisan serve</code></pre>
        <h3>7. Eseguire i test</h3>
        <p>Per assicurarti che tutto funzioni correttamente, esegui i test:</p>
        <pre><code>php artisan test</code></pre>
        <h2>Utilizzo</h2>
        <p>Una volta che il server è in esecuzione, puoi accedere all'applicazione nel tuo browser web all'indirizzo <code>http://127.0.0.1:8000</code>.</p>
    </div>
</body>
</html>
