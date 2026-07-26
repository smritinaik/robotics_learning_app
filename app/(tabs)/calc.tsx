import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const COLORS = {
  bgSoftPink: '#FCE7F3',     // Main background color
  inkBlack: '#000000',       // Bold outlines, text, and active keys
  white: '#FFFFFF',          // High contrast clean input surface
  cardYellow: '#FEF08A',     // Standout calculator display background
  cardMint: '#A7F3D0',       // Mint background color for action buttons
  cardCoral: '#FCA5A5',      // High prominence coral fill accent for backspace
  themeBlue: '#97c6ff',      // Neo-Brutalist Sky Blue matching your theme profile
};

export default function Calculator() {
  const [driver, setDriver] = useState('');
  const [driven, setDriven] = useState('');
  const [rpm, setRpm] = useState('');
  const [torque, setTorque] = useState('');

  const [result, setResult] = useState('0.00');
  
  // Tracks which input field receives custom keypad presses
  const [activeField, setActiveField] = useState<'driver' | 'driven' | 'rpm' | 'torque'>('driver');

  const getRatio = () => {
    const driverTeeth = Number(driver);
    const drivenTeeth = Number(driven);

    if (!driverTeeth || !drivenTeeth) {
      setResult('Error: Missing Teeth ⚙️');
      return null;
    }

    return drivenTeeth / driverTeeth;
  };

  const calculateRatio = () => {
    const ratio = getRatio();
    if (ratio !== null) {
      setResult(`Ratio = ${ratio.toFixed(2)}`);
    }
  };

  const calculateRPM = () => {
    const ratio = getRatio();
    if (ratio === null) return;

    const motorRPM = Number(rpm);
    if (!motorRPM) {
      setResult('Error: Missing RPM 🚀');
      return;
    }

    const outputRPM = motorRPM / ratio;
    setResult(`${outputRPM.toFixed(2)} RPM`);
  };

  const calculateTorque = () => {
    const ratio = getRatio();
    if (ratio === null) return;

    const motorTorque = Number(torque);
    if (!motorTorque) {
      setResult('Error: Missing Torque 💪');
      return;
    }

    const outputTorque = ratio * motorTorque;
    setResult(`Torque = ${outputTorque.toFixed(2)}`);
  };

  // Custom Keypad Logic
  const handleKeyPress = (val: string) => {
    // Helper to guard against multiple decimals in a single input field
    const currentVal = () => {
      if (activeField === 'driver') return driver;
      if (activeField === 'driven') return driven;
      if (activeField === 'rpm') return rpm;
      return torque;
    };

    if (val === '.' && currentVal().includes('.')) return;

    if (activeField === 'driver') setDriver((prev) => prev + val);
    if (activeField === 'driven') setDriven((prev) => prev + val);
    if (activeField === 'rpm') setRpm((prev) => prev + val);
    if (activeField === 'torque') setTorque((prev) => prev + val);
  };

  const handleBackspace = () => {
    if (activeField === 'driver') setDriver((prev) => prev.slice(0, -1));
    if (activeField === 'driven') setDriven((prev) => prev.slice(0, -1));
    if (activeField === 'rpm') setRpm((prev) => prev.slice(0, -1));
    if (activeField === 'torque') setTorque((prev) => prev.slice(0, -1));
  };

  const handleClearAll = () => {
    setDriver('');
    setDriven('');
    setRpm('');
    setTorque('');
    setResult('0.00');
  };

  return (
    <ScrollView 
      style={styles.mainWrapper} 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. CALCULATOR PANE ROW - PLACED AT THE TOP */}
      <View style={styles.resultBox}>
        <Text style={styles.resultText}>{result}</Text>
      </View>

      {/* 2. FORM PARAMETERS AREA */}
      <Text style={styles.heading}>Enter Teeth</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, activeField === 'driver' && styles.activeInput]}
          placeholder="Driver"
          placeholderTextColor="#71717A"
          showSoftInputOnFocus={false} // Prevents native system keyboard popup override
          onFocus={() => setActiveField('driver')}
          value={driver}
        />

        <TextInput
          style={[styles.input, activeField === 'driven' && styles.activeInput]}
          placeholder="Driven"
          placeholderTextColor="#71717A"
          showSoftInputOnFocus={false}
          onFocus={() => setActiveField('driven')}
          value={driven}
        />
      </View>

      <Text style={styles.heading}>Motor Details</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, activeField === 'rpm' && styles.activeInput]}
          placeholder="RPM"
          placeholderTextColor="#71717A"
          showSoftInputOnFocus={false}
          onFocus={() => setActiveField('rpm')}
          value={rpm}
        />

        <TextInput
          style={[styles.input, activeField === 'torque' && styles.activeInput]}
          placeholder="Torque"
          placeholderTextColor="#71717A"
          showSoftInputOnFocus={false}
          onFocus={() => setActiveField('torque')}
          value={torque}
        />
      </View>

      {/* 3. CALCULATION TRIGGER CONTROL BUTTONS */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.calcButton} onPress={calculateRatio}>
          <Text style={styles.calcButtonText}>Ratio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.calcButton} onPress={calculateRPM}>
          <Text style={styles.calcButtonText}>RPM</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.calcButton} onPress={calculateTorque}>
          <Text style={styles.calcButtonText}>Torque</Text>
        </TouchableOpacity>
      </View>

      {/* 4. CUSTOM HARDWARE NUMPAD KEYBOARD */}
      <View style={styles.keypadContainer}>
        {[
          ['1', '2', '3'],
          ['4', '5', '6'],
          ['7', '8', '9'],
          ['.', '0', '⌫'],
        ].map((keyRow, rowIndex) => (
          <View key={rowIndex} style={styles.keypadRow}>
            {keyRow.map((key) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.keyItem,
                  key === '⌫' && styles.backspaceKey
                ]}
                onPress={() => key === '⌫' ? handleBackspace() : handleKeyPress(key)}
              >
                <Text style={[styles.keyText, key === '⌫' && styles.backspaceText]}>
                  {key}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Full-width Neo-Brutalist Blue Clear Action Row */}
        <View style={styles.keypadRow}>
          <TouchableOpacity 
            style={[styles.keyItem, styles.clearKey]} 
            onPress={handleClearAll}
          >
            <Text style={styles.clearKeyText}>CLEAR ALL VALUES</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: COLORS.bgSoftPink,
  },

  container: {
    padding: 20,
    paddingTop: 36,
    paddingBottom: 130, 
  },

  /* Top aligned Display styling */
  resultBox: {
    backgroundColor: COLORS.cardYellow,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    shadowColor: COLORS.inkBlack,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    marginBottom: 20,
  },

  resultText: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.inkBlack,
  },

  heading: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.inkBlack,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  input: {
    width: '48%',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.inkBlack,
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    shadowColor: COLORS.inkBlack,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },

  activeInput: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.inkBlack,
    borderStyle: 'dashed',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 24,
  },

  calcButton: {
    width: '31%',
    backgroundColor: COLORS.cardMint,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    shadowColor: COLORS.inkBlack,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },

  calcButtonText: {
    color: COLORS.inkBlack,
    fontWeight: '900',
    fontSize: 14,
  },

  /* Neo-Brutalist Integrated Numpad Style Grid */
  keypadContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    borderRadius: 24,
    padding: 12,
    shadowColor: COLORS.inkBlack,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },

  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  keyItem: {
    width: '31%',
    height: 54,
    backgroundColor: COLORS.bgSoftPink,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.inkBlack,
    shadowColor: COLORS.inkBlack,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },

  backspaceKey: {
    backgroundColor: COLORS.cardCoral,
  },

  clearKey: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.themeBlue, // Transformed background color to blue accent 
    marginTop: 4,
  },

  keyText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.inkBlack,
  },

  backspaceText: {
    fontSize: 18,
  },

  clearKeyText: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.inkBlack, // Bold black text over blue surface for premium contrast scaling
    letterSpacing: 1,
  },
});