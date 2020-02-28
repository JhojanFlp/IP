import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Card, CardBody, Col } from 'reactstrap';

const Red = () => {

  const [ ip1, setIp1 ] = useState('');
  const [ ip2, setIp2 ] = useState('');
  const [ mask , setMask ] = useState('');
  const [ msg, setMsg ] = useState('');
  const [ result, setResult ] = useState([]);

  const red = e => {
    e.preventDefault();

    const ip1List = ip1.split('.');
    const ip2List = ip2.split('.');
    const maskList = mask.split('.');

    var ip1Binary = "";
    var ip2Binary = "";
    var maskBinary = "";

    // Get ip binary
    for(var i = 0; i < 4; i++){
      ip1Binary += ("00000000"+parseInt(ip1List[i]).toString(2)).substr(-8);
      ip2Binary += ("00000000"+parseInt(ip2List[i]).toString(2)).substr(-8);
      maskBinary += parseInt(maskList[i]).toString(2);
    }

    var ones = maskBinary.split('1').length - 1;
    
    // Convert to direction of red
    for(var i = ones - 1; i < 32; i++){
      ip1Binary = ip1Binary.substring(0, i) + "0" + ip1Binary.substring(i + 1);
      ip2Binary = ip2Binary.substring(0, i) + "0" + ip2Binary.substring(i + 1);
    }

    if(ip1Binary === ip2Binary){
      setMsg('¡Pertenecen a la misma red!');

      var broadcastBinary = ip1Binary;
      for(var i = ones; i < 32; i++){
        broadcastBinary = broadcastBinary.substring(0, i) + "1" + broadcastBinary.substring(i + 1);
      }

      var red = "";
      var broadcast = "";

      for(var i = 0; i < 4; i++){
        var ind = i * 8;
        red += parseInt(ip1Binary.substring(ind, ind + 8), 2);
        broadcast += parseInt(broadcastBinary.substring(ind, ind + 8), 2)
        if(i !== 3){
          red += '.';
          broadcast += '.';
        }
      }
      red += '/' + ones;

      const maxHosts = Math.pow(2, 32 - ones) - 2; 
      setResult([red, broadcast, maxHosts]);
      
    } else{
      setMsg('¡No pertenecen a la misma red!');
      setResult([]);
    }
  }

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="row justify-content-center mb-4">
            <h2>¿Pertenecen a la misma red?</h2>
          </div>
          <Form
            onSubmit={red}
          >
            <FormGroup row>
              <Label for="mask" sm={4}>Máscara de Red:</Label>
              <Col sm={8}>
              <Input 
                type="text" 
                name="mask" 
                id="mask" 
                placeholder="Ej: 255.255.0.0" 
                onChange={e => setMask(e.target.value)}
              />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="ip1" sm={4}>Dirección IP #1:</Label>
              <Col sm={8}>
              <Input 
                type="text" 
                name="ip1" 
                id="ip1" 
                placeholder="Ej: 196.168.0.1" 
                onChange={e => setIp1(e.target.value)}
              />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="ip2" sm={4}>Dirección IP #2:</Label>
              <Col sm={8}>
                <Input 
                  type="text" 
                  name="ip2" 
                  id="ip2" 
                  placeholder="Ej: 196.168.0.1" 
                  onChange={e => setIp2(e.target.value)}
                />
              </Col>
            </FormGroup>
            <div className="text-center my-4">
              <Button type="submit" color="primary">Enviar</Button>
            </div>
          </Form>
          {(msg === "") 
            ? null 
            : <Card className="my-3" body inverse color="primary">
                <CardBody>
                  <h3>{msg}</h3>
                  {(result.length === 0)
                    ? null
                  : <div className="container mt-3">
                      <Label>> Dirección IP de red: <Label className="font-weight-bold">{result[0]}</Label></Label>
                      <Label>> Dirección IP de broadcast: <Label className="font-weight-bold">{result[1]}</Label></Label>
                      <Label>> Número máximo de hosts: <Label className="font-weight-bold">{result[2]}</Label></Label>
                    </div>
                  }
                </CardBody>
              </Card>
          }
        </CardBody>
      </Card>
    </div>
  );
}
 
export default Red;