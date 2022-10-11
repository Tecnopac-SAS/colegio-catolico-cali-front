export class Extracurricular{
  public id=0;
  public imagen:any;
  public startDate="";
  public finalDate="";
  public teacher="";
  public activity="";
  public price=0;
  public isActive=0
  public information="";
  public schedule="";
}

export class ExtracurricularFile{
  constructor(

      public imagen: string,
      public activity: string,
      public startDate: string,
      public finalDate: string,
      public teacher: string,
      public price:number,
      public information: string,
      public schedule: string,
  ){

  }
}


