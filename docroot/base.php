<?php
$var = base64_decode("iVBORw0KGgoAAAANSUhEUgAAACMAAAAPCAYAAABut3YUAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wFAg8nG5A9DbsAAAFkSURBVEjHzdU9SJZRFAfwX68ORmgW4qDkYAgODhK4hYUf6PqiuCiSQwoujk6NDToHGbgEOjS5OIkG8goOOgR+TS7REIQWojbo4HKEhxd9fbQH7MDhXi7n3PM/9/zvOQ8auz7BpPuXqfIAMv0fgJnMxSaXUruxid5b+KRV5Qkw10kl8tjHAF6gCxt4jVX8yeJp0oB5hVmcJ+wn0I8GjOFzFmDSlOkrvqMMv1HACZ7hGN+yKtNNYHrwHnU4wFt04A1+oQIjYZf0Oy2hd+bMDGpjv4MlPMQy9tAeZcqjKeFXhaMr7qsqRYmbXmYUH3GGZnTib6zNcf4h7Ip9q4tiVf/rbyrgJwZRE0TeQgue4AfeJS8skqc4jDWXBYFb8SgCP8bLyPIc9cGhUv41WfaZhSDvenTr8fjK83iOtTRZZ9VnREBYRBu+YDc0l9U8uATTjZUU9tvoS5nAbaTzEswchjB8z4Ny7gJ7SEKy2djfRAAAAABJRU5ErkJggg==");

file_put_contents("edit.png", $var);

?>
