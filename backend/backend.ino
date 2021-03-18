#include "aWOT.h"
#include "StaticFiles.h"

int time_since_last_control_request = 0;
Application app;

void setup()
{
  app.use(staticFiles());
}

void loop()
{
  
}
