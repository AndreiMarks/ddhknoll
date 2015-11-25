(function() {
    function Item( img, position ) {
        this.Container_constructor();
        // Dots Debugging
        this.dotColor = "#99FF00";
        this.dotDiameter = 2;

        this.setup( img , position);
        this.setAlignment();
    }

    var p = createjs.extend( Item, createjs.Container );

    p.setup = function( img, position ) {
        var maxSpeed = 0;
        this.xSpeed = -maxSpeed + Math.random() * maxSpeed * 2;
        this.ySpeed = -maxSpeed + Math.random() * maxSpeed * 2;
        this.name = img;

        if(position == null)
        {
            var w = stage.canvas.width;
            var h = stage.canvas.height;

            this.x = (w * Math.random()) - (w * 0.5);
            this.y = (h * Math.random()) - (h * 0.5);
            this.rotation = Math.random() * 360;            
        }else{
            this.x = position.x;
            this.y = position.y;
            this.rotation = position.rotation;            
        }   

        this.tickEnabled = false;

        // Bitmap
        var bitmap = new createjs.Bitmap(imgPath + img);
        var bounds = bitmap.getBounds();

        this.scaleFactor = .7;
        bitmap.scaleX *= this.scaleFactor;
        bitmap.scaleY *= this.scaleFactor;

        if(bounds)
        {
        	bitmap.x = -bounds.width * .5 * this.scaleFactor;
        	bitmap.y = -bounds.height * .5 * this.scaleFactor;
    	}
    	
        this.bitmap = bitmap;
        this.addChild( bitmap );

        // add shadow
        var shadowSize = 5;
        bitmap.shadow = new createjs.Shadow("rgba(0,0,0,0.2)", 2, 2, shadowSize); //"#c5c2bb"
        bitmap.scaleX = bitmap.scaleY = this.scaleFactor;

        var hit = new createjs.Shape();

        this.resize();

        this.on( "click", this.handleClick );
        this.on( "pressmove", this.handlePressMove );
        this.on( "pressup", this.handlePressUp );
        this.on( "rollover", this.handleRollOver );
        this.on( "rollout", this.handleRollOut );

        this.cursor = "pointer";

        this.offset = Math.random() * 10;
        this.count = 0;
        this.pressing = false;
        this.wasMoved = false;    
    }

    p.getClosestAlignmentDotToPoint = function( point ) {
        var aPoints = this.alignment.allAlignments;
        var itemPosition = new Vector( this.x, this.y );

        var closestIndex = 0;
        var closestPoint = itemPosition.add( aPoints[closestIndex] );
        var closestDistance = Vector.distance( closestPoint, point );

        for( var i = 0; i < aPoints.length; i++ )
        {
            var position = itemPosition.add( aPoints[i] );
            var distance = Vector.distance( position, point );
            if ( distance < closestDistance )
            {
                closestDistance = distance;
                closestIndex = i;
            }
        }
        
        var closestIndex = this.alignment.getClosestIndexByRotation( closestIndex, this.rotation );
        return this.guideDrawer.dots[closestIndex];
    }

    p.getClosestAlignmentPoint = function() {
        var closestDistance;
        var closestVector;

        for( var i = 0; i < this.alignment.allAlignments.length; i++ )
        {
            var alignmentVector = this.alignment.allAlignments[i];
        }
    }

    p.getNextRotationValue = function( rotation ) {
        var stepCount = 4;
        for( var i = 0; i < stepCount; i++ )
        {
            var stepAngle = ( 360 / stepCount ) * (i+1);
            if ( rotation >= stepAngle ) continue;

            if ( i == stepCount - 1 ) return 0;
            return stepAngle;
        }
    }

    p.getRoundedNumber = function( number ) { 
        return Math.round( number / gridSize ) * gridSize; 
    }

    p.handleClick = function( evt ) {
        if ( this.wasMoved ) return;
        this.rotation = this.getNextRotationValue( this.rotation );
    }

    p.handlePressMove = function( event ) {
        if ( !this.wasPressed )
        {
            this.offsetX = event.stageX - this.x;
            this.offsetY = event.stageY - this.y;
            this.wasPressed = true;
            this.wasMoved = false;

            var stagePoint = new Vector( event.stageX - itemContainer.x, event.stageY - itemContainer.y );
            this.closestAlignmentDot = this.getClosestAlignmentDotToPoint( stagePoint );
            var dot = this.closestAlignmentDot;
            if ( dot != null )
            {
                dot.show( "red" );
            }

            this.guideDrawer.showGuides();
        } else {
            this.wasMoved = true;            
        }

        var testX = event.stageX - this.offsetX;
        var testY = event.stageY - this.offsetY;
        
        /*
        this.x = this.getRoundedNumber( testX );
        this.y = this.getRoundedNumber( testY );
        */
        this.x = testX;
        this.y = testY;

        this.pressing = true;
        this.parent.setChildIndex( this , this.parent.numChildren-1);
    }

    p.handlePressUp = function( event ) {
        this.wasPressed = false;
        this.pressing = false;
        this.wasMoved = false;

        var dot = this.closestAlignmentDot;
        if ( dot != null )
        {
            dot.show( this.dotColor );
        }

        this.guideDrawer.hideGuides();
    }

    p.handleRollOver = function( event ) {
    	if(this.pressing == true)
    		return;

        this.guideDrawer.showGuides();
        this.parent.setChildIndex( this , this.parent.numChildren-1);
    }

    p.handleRollOut = function( event ) {
        this.guideDrawer.hideGuides();
    }

    p.resize = function( event ) {
        this.x = Math.round( this.x );
        this.y = Math.round( this.y );
        
    }

    p.setAlignment = function () {
        // Alignment
        this.alignment = new Alignment( this );

        // Guides
        this.guideDrawer = new GuideDrawer( this );
        this.guideDrawer.hideGuides();
    }

    window.Item = createjs.promote( Item, "Container" );

} () );
