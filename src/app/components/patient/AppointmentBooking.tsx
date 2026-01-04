import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Calendar } from '../ui/calendar';
import { Badge } from '../ui/badge';

const doctors = [
  { id: '1', name: 'Dr. Sarah Johnson', specialty: 'General Physician', available: true },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Cardiologist', available: true },
  { id: '3', name: 'Dr. Emily Davis', specialty: 'Pediatrician', available: false },
];

const visitTypes = [
  { id: 'regular', label: 'Regular Checkup', duration: '30 mins' },
  { id: 'first', label: 'First Visit', duration: '45 mins' },
  { id: 'followup', label: 'Follow-up', duration: '20 mins' },
];

export default function AppointmentBooking() {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedVisitType, setSelectedVisitType] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [booked, setBooked] = useState(false);

  const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30'];

  const handleBookAppointment = () => {
    setBooked(true);
  };

  if (booked) {
    const doctor = doctors.find(d => d.id === selectedDoctor);
    const visitType = visitTypes.find(v => v.id === selectedVisitType);
    
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <h2 className="text-2xl text-gray-900">Appointment Confirmed!</h2>
              <p className="text-gray-600">Your appointment has been successfully booked</p>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left space-y-2">
                <p className="text-sm"><span className="text-gray-600">Doctor:</span> <span className="text-gray-900">{doctor?.name}</span></p>
                <p className="text-sm"><span className="text-gray-600">Visit Type:</span> <span className="text-gray-900">{visitType?.label}</span></p>
                <p className="text-sm"><span className="text-gray-600">Date:</span> <span className="text-gray-900">{selectedDate?.toLocaleDateString()}</span></p>
                <p className="text-sm"><span className="text-gray-600">Time:</span> <span className="text-gray-900">{selectedTime}</span></p>
                <p className="text-sm"><span className="text-gray-600">Duration:</span> <span className="text-gray-900">{visitType?.duration}</span></p>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-4">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Patient will receive confirmation via WhatsApp</span>
              </div>

              <div className="pt-4">
                <Button onClick={() => {setBooked(false); setStep(1);}}>Book Another Appointment</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900">Book an Appointment</h1>
        <p className="text-gray-600 mt-2">Schedule your visit in a few simple steps</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step >= s ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {s}
            </div>
            {s < 4 && <div className={`w-12 h-0.5 ${step > s ? 'bg-gray-900' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Doctor */}
      {step === 1 && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Select Doctor</CardTitle>
            <CardDescription>Choose from available doctors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <RadioGroup value={selectedDoctor} onValueChange={setSelectedDoctor}>
              {doctors.map((doctor) => (
                <div key={doctor.id} className={`flex items-center space-x-4 p-4 border rounded-lg ${
                  !doctor.available ? 'opacity-50' : 'cursor-pointer hover:bg-gray-50'
                }`}>
                  <RadioGroupItem value={doctor.id} id={doctor.id} disabled={!doctor.available} />
                  <Label htmlFor={doctor.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-900">{doctor.name}</p>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      </div>
                      {!doctor.available && (
                        <Badge variant="secondary">Unavailable</Badge>
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="pt-4">
              <Button 
                onClick={() => setStep(2)} 
                disabled={!selectedDoctor}
                className="w-full"
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Select Visit Type */}
      {step === 2 && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Select Visit Type</CardTitle>
            <CardDescription>Choose the type of appointment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <RadioGroup value={selectedVisitType} onValueChange={setSelectedVisitType}>
              {visitTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value={type.id} id={type.id} />
                  <Label htmlFor={type.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-900">{type.label}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{type.duration}</span>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={!selectedVisitType} className="flex-1">
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Select Date */}
      {step === 3 && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>Choose an available date</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep(4)} disabled={!selectedDate} className="flex-1">
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Select Time */}
      {step === 4 && (
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Select Time Slot</CardTitle>
            <CardDescription>Available time slots for {selectedDate?.toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 border rounded-lg text-sm transition-colors ${
                    selectedTime === time
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleBookAppointment} disabled={!selectedTime} className="flex-1">
                Book Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
