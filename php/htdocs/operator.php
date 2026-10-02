<html>
    <head>
        <title>Operators</title>
    </head>
    <body>
        <h1>Arithmetic operators</h1>
        <?php
        $a=10;
        $b=4;
        echo "a=",$a;
        echo "<br>";
        echo "b=",$b;
         echo "<br>";
        echo $a+$b;
        echo "<br>";
        echo $a-$b;
        echo "<br>";
        echo $a*$b;
        echo "<br>";
        echo $a/$b;
        echo "<br>";
        echo $a%$b;
        
        echo"<h1>Assignment operators</h1>";
        echo "a=",$a;
        echo "<br>";
        echo "b=",$b;
        echo "<br>";
        echo "a+=5=" ,$b+=5;
        echo "<br>";
        echo "a-=5=" ,$b-=5;
        echo "<br>";
       
        echo "<h1>Comparison operators</h1>";
        echo "a=",$a;
        echo "<br>";
        echo "b=",$b;
        echo "<br>";
        echo "a==b=" ,$a==$b;
        echo "<br>";
        echo "a!=b=" ,$a!=$b;
        echo "<br>";
       
        echo "<h2>Increment/Decrement Operators</h2>";
        $a=50;
        echo "a= ".$a;
        echo "<br>";
        echo "++a= ".++$a;
        echo "<br>";
        echo "a++= ".$a++;
        echo "<br>";
        echo "--a= ".--$a;
        echo "<br>";
        echo "a--= ".$a--;
        echo "<br>";
       
        echo "<h2>Logical Operators</h2>";
        $a=10;
        $b=20;
        echo "a= ".$a;      
        echo "<br>";
        echo "b= ".$b;
        echo "<br>";
        echo "a and b= ".$a and $b;
        echo "<br>";
        echo "a or b= ".$a or $b;
        echo "<br>";
      
        echo "<h2>String Operators</h2>";
        $a="Hello";
        $b="World";
        echo "a= ".$a;
        echo "<br>";
        echo "b= ".$b;
        echo "<br>";
        echo "a.b= ".$a.$b;
        echo "<br>";

        echo "<h2>Array Operators</h2>";
        $a=array("a"=>"red","b"=>"green");
        $b=array("c"=>"blue","d"=>"yellow");
        echo "a= ";     
        echo "<pre>";
        print_r($a);
        echo "</pre>";
        echo "b= ";
        echo "<pre>";
        print_r($b);
        ?>

        
    </body>
</html>