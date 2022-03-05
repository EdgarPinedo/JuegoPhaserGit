export class nivel3 extends Phaser.Scene
{
    constructor()
    {
        super( {key:'nivel3'} );
    }

    player;
    player2;
    stars;
    bombs;
    platforms2;
    fuego;
    cursors;
    score = 0;
    score2 = 0;
    gameOver = false;
    scoreText;
    nivel;
    spawnbombs = 8;
    spawnStars = 24;
    posX = 12; 
    posX2 = 30;
    final;
    overlaping1 = false;
    overlaping2 = false;

    preload ()
    {
        this.load.image('ground2', 'assetes/pisoPasto.png');
        this.load.image('fuego', 'assetes/fuego.png');
        this.load.image('star', 'assetes/star.png');
        this.load.image('bomb', 'assetes/bomb.png');
        this.load.spritesheet('dude', 'assetes/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('dude2', 'assetes/dude2.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('background', 'assetes/background.png'); 
        this.load.image('lamp', 'assetes/lamp.png');
    }

    create ()
    {
        this.physics.world.checkCollision.down = true;
        
        this.pantallaMovil = this.add.zone(603, 3000, 3000, 603);
        this.physics.world.enable(this.pantallaMovil, Phaser.Physics.Arcade.STATIC_BODY);

        //  A simple background for our game

        //this.scene.restart();
        this.add.image(455, 304, 'background');
        this.add.image(880, 304, 'background');
        this.add.image(1700, 304, 'background');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        //
        this.platforms2 = this.physics.add.staticGroup();
        this.fuego = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.fuego.create(10, 595, 'fuego').setScale(1).refreshBody();
        this.fuego.create(210, 595, 'fuego').setScale(1).refreshBody();
        this.fuego.create(450, 595, 'fuego').setScale(1).refreshBody();
        this.fuego.create(700, 595, 'fuego').setScale(1).refreshBody();
        this.fuego.create(950, 595, 'fuego').setScale(1).refreshBody();
        this.fuego.create(1190, 595, 'fuego').setScale(1).refreshBody();
        this.fuego.create(1400, 595, 'fuego').setScale(1).refreshBody();
        this.fuego.create(1670, 595, 'fuego').setScale(1).refreshBody();
        this.fuego.create(1900, 595, 'fuego').setScale(1).refreshBody();
        
        this.platforms2.create(100, 590, 'ground2').setScale(1).refreshBody();
        this.platforms2.create(340, 590, 'ground2').setScale(1).refreshBody();
        this.platforms2.create(580, 590, 'ground2').setScale(1).refreshBody();
        this.platforms2.create(820, 590, 'ground2').setScale(1).refreshBody();
        this.platforms2.create(1060, 590, 'ground2').setScale(1).refreshBody();
        this.platforms2.create(1300, 590, 'ground2').setScale(1).refreshBody();
        this.platforms2.create(1540, 590, 'ground2').setScale(1).refreshBody();
        this.platforms2.create(1780, 590, 'ground2').setScale(1).refreshBody();
        this.platforms2.create(2020, 590, 'ground2').setScale(1).refreshBody();

        //  Now let's create some ledges
        this.platforms2.create(600, 450, 'ground2');
        this.platforms2.create(100, 350, 'ground2');
        this.platforms2.create(750, 320, 'ground2');
        this.platforms2.create(380, 250, 'ground2');
        this.platforms2.create(970, 190, 'ground2');
        this.platforms2.create(1210, 190, 'ground2');
        this.platforms2.create(1050, 400, 'ground2');
        this.platforms2.create(1350, 500, 'ground2');
        this.platforms2.create(1550, 300, 'ground2');
        this.platforms2.create(1850, 150, 'ground2');

        // The player and its settings
        this.player = this.physics.add.sprite(150, 450, 'dude');
        this.player2 = this.physics.add.sprite(100, 450, 'dude2');

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player2.setBounce(0.2);
        this.player2.setCollideWorldBounds(true);

        //  Our player1 animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


        //  Our player2 animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left2',
            frames: this.anims.generateFrameNumbers('dude2', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn2',
            frames: [ { key: 'dude2', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right2',
            frames: this.anims.generateFrameNumbers('dude2', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cameras.main.setBounds(0, 0, 3000, 603, true, true, true, false);
        this.physics.world.setBounds(0, 0, 3000, 603, true, true, true, false);
        this.cameras.main.startFollow(this.player);

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        //  Some stars to collect, 16 in total, evenly spaced 70 pixels apart along the x axis
        this.stars = this.physics.add.group();
        this.stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        this.bombs = this.physics.add.group();

        this.final = this.physics.add.group({
            key: 'lamp',
            setXY: { x: 2950, y: 95}
        });

        //  The score
        this.scoreText = this.add.text(16, 16, 'Score P1: ' + this.score, { fontSize: '32px', fill: '#fff' });
        this.scoreText2 = this.add.text(1650, 16, 'Score P2: ' + this.score2, { fontSize: '32px', fill: '#fff' });
        this.nivel = this.add.text(900, 16, 'Nivel 2', { fontSize: '32px', fill: '#fff' });

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.player, this.platforms2);
        this.physics.add.collider(this.player2, this.platforms2);
        this.physics.add.collider(this.stars, this.platforms2);
        this.physics.add.collider(this.bombs, this.platforms2);
        this.physics.add.collider(this.final, this.platforms2);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(this.player, this.stars, this.collectStar2, null, this);
        this.physics.add.overlap(this.player2, this.stars, this.collectStar, null, this);
        
        this.physics.add.overlap(this.player, this.final, this.finalizarNivel, null, this);
        this.physics.add.overlap(this.player2, this.final, this.finalizarNivel, null, this);

        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        this.physics.add.collider(this.player2, this.bombs, this.hitBomb, null, this);
        
        this.physics.add.collider(this.player, this.fuego, this.hitBomb, null, this);
        this.physics.add.collider(this.player2, this.fuego, this.hitBomb, null, this);
    }

    update ()
    {
        if (this.gameOver)
        {
            return;
        }

        if (this.overlaping1 === true && this.overlaping2 === true)
        {
            this.scene.start("nivel3");
        }

        /*if (this.spawnbombs > 0)
        {
            var y = Phaser.Math.Between(0, 350);
            var bomb = this.bombs.create(this.posX2, y, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 50);
                bomb.allowGravity = false;
                this.posX2+=200
            this.spawnbombs--;
        }*/

        if (this.spawnStars > 0)
        {
            var y = Phaser.Math.Between(0, 300);
            var starsss = this.stars.create(this.posX, y, 'star');
            starsss.allowGravity = true;
            this.posX += 70;
            this.spawnStars--;
        }

        //PLAYER2 KEYS
        if (this.keyA.isDown) 
        {
            this.player2.setVelocityX(-160);
            this.player2.anims.play('left2', true);

        }
        else if (this.keyD.isDown)
        {
            this.player2.setVelocityX(160);
            this.player2.anims.play('right2', true);
        }
        else
        {
            this.player2.setVelocityX(0);
            this.player2.anims.play('turn2');
        }
        if (this.keyW.isDown && this.player2.body.touching.down)
        {
            this.player2.setVelocityY(-330);
        }

        //PLAYER1 KEYS
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }

    collectStar (player, star, bandera)
    {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score P1: ' + this.score);
    }

    collectStar2 (player, star)
    {
        star.disableBody(true, true);
        this.score2 += 10;
        this.scoreText2.setText('Score P2: ' + this.score2);
    }

    hitBomb (player, bomb)
    {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.gameOver = true;
    }

    finalizarNivel (a, final)
    {
        if(a === this.player){
            this.overlaping1 = true;
            this.player.disableBody(true, false);
        }
        else if(a === this.player2){
            this.overlaping2 = true;
            this.player2.disableBody(true, false);
        }
    }
}