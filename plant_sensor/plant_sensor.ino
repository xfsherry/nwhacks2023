// code source: https://how2electronics.com/interface-capacitive-soil-moisture-sensor-arduino/
const int AirValue = 494;   //you need to replace this value
const int WaterValue = 220;  //you need to replace this value
int soilMoistureValue = 0;
int soilmoisturepercent=0;
void setup() {
  Serial.begin(9600); // open serial port, set the baud rate to 9600 bps
}
void loop() {
soilMoistureValue = analogRead(A0);  //put Sensor insert into soil
Serial.println(soilMoistureValue);
soilmoisturepercent = map(soilMoistureValue, AirValue, WaterValue, 0, 100);
if(soilmoisturepercent >= 100)
{
  Serial.println("100 %");
}
else if(soilmoisturepercent <=0)
{
  Serial.println("0 %");
}
else if(soilmoisturepercent >0 && soilmoisturepercent < 100)
{
  Serial.print(soilmoisturepercent);
  Serial.println("%");
  
}
  delay(250);
}
