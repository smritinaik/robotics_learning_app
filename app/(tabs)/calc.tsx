import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  calcGearRatio,
  calcGearRPM,
  calcGearTorque,
  calculateOhmsLaw,
  OhmsMode,
  RESISTOR_COLORS,
  ColorOption,
  formatResistance,
} from '../../utils/roboticsUtils';

const COLORS = {
  bgSoftPink: '#FCE7F3',
  inkBlack: '#000000',
  white: '#FFFFFF',
  cardYellow: '#FEF08A',
  cardMint: '#A7F3D0',
  cardCoral: '#FCA5A5',
  themeBlue: '#97c6ff',
};

type TabType = 'gears' | 'ohms' | 'resistor';

export default function Calculator() {
  const [activeTab, setActiveTab] = useState<TabType>('gears');

  // --- GEARS STATE ---
  const [driver, setDriver] = useState('');
  const [driven, setDriven] = useState('');
  const [rpm, setRpm] = useState('');
  const [torque, setTorque] = useState('');
  const [gearResult, setGearResult] = useState('0.00');
  const [gearActiveField, setGearActiveField] = useState<'driver' | 'driven' | 'rpm' | 'torque'>('driver');

  // --- OHM'S LAW STATE ---
  const [ohmsMode, setOhmsMode] = useState<OhmsMode>('voltage');
  const [ohmsVal1, setOhmsVal1] = useState('');
  const [ohmsVal2, setOhmsVal2] = useState('');
  const [ohmsResult, setOhmsResult] = useState('0.00');
  const [ohmsActiveField, setOhmsActiveField] = useState<'val1' | 'val2'>('val1');

  // --- RESISTOR STATE ---
  const [bandCount, setBandCount] = useState<4 | 5>(4);
  const [bandA, setBandA] = useState<ColorOption>(RESISTOR_COLORS[1]); // Brown = 1
  const [bandB, setBandB] = useState<ColorOption>(RESISTOR_COLORS[7]); // Violet = 7
  const [bandC, setBandC] = useState<ColorOption>(RESISTOR_COLORS[2]); // Red = x100 or Digit 2
  const [bandD, setBandD] = useState<ColorOption>(RESISTOR_COLORS[2]); // Red Multiplier or Tolerance
  const [bandE, setBandE] = useState<ColorOption>(RESISTOR_COLORS[10]); // Gold Tolerance
  const [pickerModal, setPickerModal] = useState<{ visible: boolean; bandKey: string }>({
    visible: false,
    bandKey: '',
  });

  // --- GEAR FUNCTIONS ---
  const handleCalculateGear = (type: 'ratio' | 'rpm' | 'torque') => {
    const ratio = calcGearRatio(Number(driver), Number(driven));
    if (ratio === null) {
      setGearResult('Error: Missing Teeth');
      return;
    }
    if (type === 'ratio') setGearResult(`Ratio = ${ratio.toFixed(2)}`);
    if (type === 'rpm') {
      if (!rpm) { setGearResult('Error: Missing RPM'); return; }
      setGearResult(`${calcGearRPM(ratio, Number(rpm)).toFixed(2)} RPM`);
    }
    if (type === 'torque') {
      if (!torque) { setGearResult('Error: Missing Torque'); return; }
      setGearResult(`Torque = ${calcGearTorque(ratio, Number(torque)).toFixed(2)}`);
    }
  };

  // --- OHM'S LAW FUNCTIONS ---
  const handleCalculateOhms = () => {
    const res = calculateOhmsLaw(ohmsMode, ohmsVal1, ohmsVal2);
    setOhmsResult(res.result);
  };

  // --- RESISTOR CALCULATION ---
  const getResistorResult = () => {
    let digits = 0;
    let multiplier = 1;
    let tolerance = '±20%';

    if (bandCount === 4) {
      digits = (bandA.digit ?? 0) * 10 + (bandB.digit ?? 0);
      multiplier = bandC.multiplier ?? 1;
      tolerance = bandD.tolerance ?? '±20%';
    } else {
      digits = (bandA.digit ?? 0) * 100 + (bandB.digit ?? 0) * 10 + (bandC.digit ?? 0);
      multiplier = bandD.multiplier ?? 1;
      tolerance = bandE.tolerance ?? '±20%';
    }

    const ohms = digits * multiplier;
    return {
      valueStr: formatResistance(ohms),
      toleranceStr: tolerance,
    };
  };

  // --- NUMPAD HANDLER ---
  const handleKeyPress = (val: string) => {
    if (activeTab === 'gears') {
      const getVal = () => {
        if (gearActiveField === 'driver') return driver;
        if (gearActiveField === 'driven') return driven;
        if (gearActiveField === 'rpm') return rpm;
        return torque;
      };
      if (val === '.' && getVal().includes('.')) return;

      if (gearActiveField === 'driver') setDriver((p) => p + val);
      if (gearActiveField === 'driven') setDriven((p) => p + val);
      if (gearActiveField === 'rpm') setRpm((p) => p + val);
      if (gearActiveField === 'torque') setTorque((p) => p + val);
    } else if (activeTab === 'ohms') {
      const getVal = () => (ohmsActiveField === 'val1' ? ohmsVal1 : ohmsVal2);
      if (val === '.' && getVal().includes('.')) return;

      if (ohmsActiveField === 'val1') setOhmsVal1((p) => p + val);
      if (ohmsActiveField === 'val2') setOhmsVal2((p) => p + val);
    }
  };

  const handleBackspace = () => {
    if (activeTab === 'gears') {
      if (gearActiveField === 'driver') setDriver((p) => p.slice(0, -1));
      if (gearActiveField === 'driven') setDriven((p) => p.slice(0, -1));
      if (gearActiveField === 'rpm') setRpm((p) => p.slice(0, -1));
      if (gearActiveField === 'torque') setTorque((p) => p.slice(0, -1));
    } else if (activeTab === 'ohms') {
      if (ohmsActiveField === 'val1') setOhmsVal1((p) => p.slice(0, -1));
      if (ohmsActiveField === 'val2') setOhmsVal2((p) => p.slice(0, -1));
    }
  };

  const handleClearAll = () => {
    if (activeTab === 'gears') {
      setDriver(''); setDriven(''); setRpm(''); setTorque('');
      setGearResult('0.00');
    } else if (activeTab === 'ohms') {
      setOhmsVal1(''); setOhmsVal2('');
      setOhmsResult('0.00');
    }
  };

  // Color picker band selection helper
  const selectColorForBand = (color: ColorOption) => {
    const key = pickerModal.bandKey;
    if (key === 'A') setBandA(color);
    if (key === 'B') setBandB(color);
    if (key === 'C') setBandC(color);
    if (key === 'D') setBandD(color);
    if (key === 'E') setBandE(color);
    setPickerModal({ visible: false, bandKey: '' });
  };

  return (
    <ScrollView
      style={styles.mainWrapper}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* TOP TAB NAVIGATION */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'gears' && styles.activeTabButton]}
          onPress={() => setActiveTab('gears')}
        >
          <Ionicons name="settings-sharp" size={14} color={COLORS.inkBlack} style={styles.iconMargin} />
          <Text style={styles.tabText}>GEARS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'ohms' && styles.activeTabButton]}
          onPress={() => setActiveTab('ohms')}
        >
          <Ionicons name="flash" size={14} color={COLORS.inkBlack} style={styles.iconMargin} />
          <Text style={styles.tabText}>OHM'S</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'resistor' && styles.activeTabButton]}
          onPress={() => setActiveTab('resistor')}
        >
          <MaterialCommunityIcons name="palette" size={14} color={COLORS.inkBlack} style={styles.iconMargin} />
          <Text style={styles.tabText}>RESISTOR</Text>
        </TouchableOpacity>
      </View>

      {/* ==================== TAB 1: GEARS ==================== */}
      {activeTab === 'gears' && (
        <View>
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{gearResult}</Text>
          </View>

          <Text style={styles.heading}>Enter Teeth</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, gearActiveField === 'driver' && styles.activeInput]}
              placeholder="Driver"
              placeholderTextColor="#71717A"
              showSoftInputOnFocus={false}
              onFocus={() => setGearActiveField('driver')}
              value={driver}
            />
            <TextInput
              style={[styles.input, gearActiveField === 'driven' && styles.activeInput]}
              placeholder="Driven"
              placeholderTextColor="#71717A"
              showSoftInputOnFocus={false}
              onFocus={() => setGearActiveField('driven')}
              value={driven}
            />
          </View>

          <Text style={styles.heading}>Motor Details</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, gearActiveField === 'rpm' && styles.activeInput]}
              placeholder="RPM"
              placeholderTextColor="#71717A"
              showSoftInputOnFocus={false}
              onFocus={() => setGearActiveField('rpm')}
              value={rpm}
            />
            <TextInput
              style={[styles.input, gearActiveField === 'torque' && styles.activeInput]}
              placeholder="Torque"
              placeholderTextColor="#71717A"
              showSoftInputOnFocus={false}
              onFocus={() => setGearActiveField('torque')}
              value={torque}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.calcButton} onPress={() => handleCalculateGear('ratio')}>
              <Text style={styles.calcButtonText}>Ratio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calcButton} onPress={() => handleCalculateGear('rpm')}>
              <Text style={styles.calcButtonText}>RPM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calcButton} onPress={() => handleCalculateGear('torque')}>
              <Text style={styles.calcButtonText}>Torque</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ==================== TAB 2: OHM'S LAW ==================== */}
      {activeTab === 'ohms' && (
        <View>
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{ohmsResult}</Text>
          </View>

          <Text style={styles.heading}>Select Target Calculation</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.modeButton, ohmsMode === 'voltage' && styles.activeModeButton]}
              onPress={() => { setOhmsMode('voltage'); setOhmsResult('0.00'); }}
            >
              <Text style={styles.calcButtonText}>Voltage (V)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeButton, ohmsMode === 'current' && styles.activeModeButton]}
              onPress={() => { setOhmsMode('current'); setOhmsResult('0.00'); }}
            >
              <Text style={styles.calcButtonText}>Current (I)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeButton, ohmsMode === 'resistance' && styles.activeModeButton]}
              onPress={() => { setOhmsMode('resistance'); setOhmsResult('0.00'); }}
            >
              <Text style={styles.calcButtonText}>Resistance (Ω)</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.heading}>Parameters</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, ohmsActiveField === 'val1' && styles.activeInput]}
              placeholder={ohmsMode === 'voltage' ? 'Current (A)' : 'Voltage (V)'}
              placeholderTextColor="#71717A"
              showSoftInputOnFocus={false}
              onFocus={() => setOhmsActiveField('val1')}
              value={ohmsVal1}
            />
            <TextInput
              style={[styles.input, ohmsActiveField === 'val2' && styles.activeInput]}
              placeholder={ohmsMode === 'resistance' ? 'Current (A)' : 'Resistance (Ω)'}
              placeholderTextColor="#71717A"
              showSoftInputOnFocus={false}
              onFocus={() => setOhmsActiveField('val2')}
              value={ohmsVal2}
            />
          </View>

          <TouchableOpacity style={styles.fullWidthActionBtn} onPress={handleCalculateOhms}>
            <Ionicons name="calculator-sharp" size={16} color={COLORS.inkBlack} style={styles.iconMargin} />
            <Text style={styles.clearKeyText}>CALCULATE OHM'S LAW</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ==================== TAB 3: RESISTOR COLOR CODE ==================== */}
      {activeTab === 'resistor' && (
        <View>
          {/* Result Card */}
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{getResistorResult().valueStr}</Text>
            <Text style={styles.subResultText}>Tol: {getResistorResult().toleranceStr}</Text>
          </View>

          {/* Resistor Visual graphic */}
          <View style={styles.resistorCanvas}>
            <View style={styles.resistorWire} />
            <View style={styles.resistorBody}>
              <View style={[styles.bandGraphic, { backgroundColor: bandA.hex }]} />
              <View style={[styles.bandGraphic, { backgroundColor: bandB.hex }]} />
              <View style={[styles.bandGraphic, { backgroundColor: bandC.hex }]} />
              {bandCount === 5 && (
                <View style={[styles.bandGraphic, { backgroundColor: bandD.hex }]} />
              )}
              <View style={[styles.bandGraphic, { backgroundColor: bandCount === 4 ? bandD.hex : bandE.hex }]} />
            </View>
            <View style={styles.resistorWire} />
          </View>

          {/* Band Type Selector */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.modeButton, bandCount === 4 && styles.activeModeButton]}
              onPress={() => setBandCount(4)}
            >
              <Text style={styles.calcButtonText}>4 Band</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeButton, bandCount === 5 && styles.activeModeButton]}
              onPress={() => setBandCount(5)}
            >
              <Text style={styles.calcButtonText}>5 Band</Text>
            </TouchableOpacity>
          </View>

          {/* Dropdown Selectors */}
          <Text style={styles.heading}>Select Band Colors</Text>
          
          <TouchableOpacity style={styles.dropdownRow} onPress={() => setPickerModal({ visible: true, bandKey: 'A' })}>
            <Text style={styles.dropdownLabel}>Band A (1st Digit)</Text>
            <View style={styles.colorBadgeRow}>
              <View style={[styles.colorPreview, { backgroundColor: bandA.hex }]} />
              <Text style={styles.dropdownValue}>{bandA.label}</Text>
              <Ionicons name="chevron-down" size={14} color={COLORS.inkBlack} style={{ marginLeft: 6 }} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dropdownRow} onPress={() => setPickerModal({ visible: true, bandKey: 'B' })}>
            <Text style={styles.dropdownLabel}>Band B (2nd Digit)</Text>
            <View style={styles.colorBadgeRow}>
              <View style={[styles.colorPreview, { backgroundColor: bandB.hex }]} />
              <Text style={styles.dropdownValue}>{bandB.label}</Text>
              <Ionicons name="chevron-down" size={14} color={COLORS.inkBlack} style={{ marginLeft: 6 }} />
            </View>
          </TouchableOpacity>

          {bandCount === 5 ? (
            <TouchableOpacity style={styles.dropdownRow} onPress={() => setPickerModal({ visible: true, bandKey: 'C' })}>
              <Text style={styles.dropdownLabel}>Band C (3rd Digit)</Text>
              <View style={styles.colorBadgeRow}>
                <View style={[styles.colorPreview, { backgroundColor: bandC.hex }]} />
                <Text style={styles.dropdownValue}>{bandC.label}</Text>
                <Ionicons name="chevron-down" size={14} color={COLORS.inkBlack} style={{ marginLeft: 6 }} />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.dropdownRow} onPress={() => setPickerModal({ visible: true, bandKey: 'C' })}>
              <Text style={styles.dropdownLabel}>Band C (Multiplier)</Text>
              <View style={styles.colorBadgeRow}>
                <View style={[styles.colorPreview, { backgroundColor: bandC.hex }]} />
                <Text style={styles.dropdownValue}>{bandC.label}</Text>
                <Ionicons name="chevron-down" size={14} color={COLORS.inkBlack} style={{ marginLeft: 6 }} />
              </View>
            </TouchableOpacity>
          )}

          {bandCount === 5 ? (
            <TouchableOpacity style={styles.dropdownRow} onPress={() => setPickerModal({ visible: true, bandKey: 'D' })}>
              <Text style={styles.dropdownLabel}>Band D (Multiplier)</Text>
              <View style={styles.colorBadgeRow}>
                <View style={[styles.colorPreview, { backgroundColor: bandD.hex }]} />
                <Text style={styles.dropdownValue}>{bandD.label}</Text>
                <Ionicons name="chevron-down" size={14} color={COLORS.inkBlack} style={{ marginLeft: 6 }} />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.dropdownRow} onPress={() => setPickerModal({ visible: true, bandKey: 'D' })}>
              <Text style={styles.dropdownLabel}>Band D (Tolerance)</Text>
              <View style={styles.colorBadgeRow}>
                <View style={[styles.colorPreview, { backgroundColor: bandD.hex }]} />
                <Text style={styles.dropdownValue}>{bandD.label}</Text>
                <Ionicons name="chevron-down" size={14} color={COLORS.inkBlack} style={{ marginLeft: 6 }} />
              </View>
            </TouchableOpacity>
          )}

          {bandCount === 5 && (
            <TouchableOpacity style={styles.dropdownRow} onPress={() => setPickerModal({ visible: true, bandKey: 'E' })}>
              <Text style={styles.dropdownLabel}>Band E (Tolerance)</Text>
              <View style={styles.colorBadgeRow}>
                <View style={[styles.colorPreview, { backgroundColor: bandE.hex }]} />
                <Text style={styles.dropdownValue}>{bandE.label}</Text>
                <Ionicons name="chevron-down" size={14} color={COLORS.inkBlack} style={{ marginLeft: 6 }} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* ==================== CUSTOM HARDWARE NUMPAD (GEARS & OHMS) ==================== */}
      {activeTab !== 'resistor' && (
        <View style={styles.keypadContainer}>
          {[
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['.', '0', 'backspace'],
          ].map((keyRow, rowIndex) => (
            <View key={rowIndex} style={styles.keypadRow}>
              {keyRow.map((key) => (
                <TouchableOpacity
                  key={key}
                  style={[styles.keyItem, key === 'backspace' && styles.backspaceKey]}
                  onPress={() => (key === 'backspace' ? handleBackspace() : handleKeyPress(key))}
                >
                  {key === 'backspace' ? (
                    <Ionicons name="backspace-outline" size={22} color={COLORS.inkBlack} />
                  ) : (
                    <Text style={styles.keyText}>{key}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}

          <View style={styles.keypadRow}>
            <TouchableOpacity style={[styles.keyItem, styles.clearKey]} onPress={handleClearAll}>
              <Ionicons name="trash-outline" size={15} color={COLORS.inkBlack} style={styles.iconMargin} />
              <Text style={styles.clearKeyText}>CLEAR ALL VALUES</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* COLOR PICKER MODAL */}
      <Modal visible={pickerModal.visible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.heading}>Choose Band Color</Text>
            <ScrollView style={{ maxHeight: 350 }}>
              {RESISTOR_COLORS.map((c) => (
                <TouchableOpacity
                  key={c.value}
                  style={styles.modalColorOption}
                  onPress={() => selectColorForBand(c)}
                >
                  <View style={[styles.colorPreview, { backgroundColor: c.hex }]} />
                  <Text style={styles.modalColorText}>{c.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.calcButton, { width: '100%', marginTop: 12 }]}
              onPress={() => setPickerModal({ visible: false, bandKey: '' })}
            >
              <Text style={styles.calcButtonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 60,
  },

  /* TAB NAVIGATION STYLES */
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tabButton: {
    width: '31%',
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    shadowColor: COLORS.inkBlack,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  activeTabButton: {
    backgroundColor: COLORS.cardYellow,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.inkBlack,
  },
  iconMargin: {
    marginRight: 6,
  },

  /* DISPLAY RESULT STYLES */
  resultBox: {
    backgroundColor: COLORS.cardYellow,
    minHeight: 90,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  subResultText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.inkBlack,
    marginTop: 2,
  },

  heading: {
    fontSize: 15,
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
    backgroundColor: COLORS.white,
    borderColor: COLORS.inkBlack,
    borderStyle: 'dashed',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 20,
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
  modeButton: {
    width: '31%',
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    shadowColor: COLORS.inkBlack,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  activeModeButton: {
    backgroundColor: COLORS.themeBlue,
  },
  calcButtonText: {
    color: COLORS.inkBlack,
    fontWeight: '900',
    fontSize: 13,
  },

  fullWidthActionBtn: {
    width: '100%',
    height: 48,
    backgroundColor: COLORS.cardMint,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    shadowColor: COLORS.inkBlack,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    marginBottom: 20,
  },

  /* RESISTOR VISUAL GRAPHIC */
  resistorCanvas: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  resistorWire: {
    height: 6,
    width: 30,
    backgroundColor: COLORS.inkBlack,
  },
  resistorBody: {
    width: 180,
    height: 44,
    backgroundColor: '#D1D5DB',
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
  },
  bandGraphic: {
    width: 12,
    height: '100%',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.inkBlack,
  },

  /* DROPDOWNS */
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    shadowColor: COLORS.inkBlack,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    marginBottom: 10,
  },
  dropdownLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.inkBlack,
  },
  colorBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorPreview: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: COLORS.inkBlack,
    marginRight: 8,
  },
  dropdownValue: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.inkBlack,
  },

  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: COLORS.bgSoftPink,
    borderRadius: 20,
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    padding: 16,
  },
  modalColorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.inkBlack,
    marginBottom: 8,
  },
  modalColorText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.inkBlack,
  },

  /* NUMPAD KEYBOARD STYLES */
  keypadContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    borderRadius: 24,
    padding: 12,
    marginTop: 8,
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
    height: 52,
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
    height: 48,
    backgroundColor: COLORS.themeBlue,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.inkBlack,
  },
  clearKeyText: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.inkBlack,
    letterSpacing: 1,
  },
});