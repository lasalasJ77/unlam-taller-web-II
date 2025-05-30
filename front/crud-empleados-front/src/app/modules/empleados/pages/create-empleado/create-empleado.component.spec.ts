import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmpleadoComponent } from './create-empleado.component';

describe('CreateEmpleadoComponent', () => {
  let component: CreateEmpleadoComponent;
  let fixture: ComponentFixture<CreateEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmpleadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
