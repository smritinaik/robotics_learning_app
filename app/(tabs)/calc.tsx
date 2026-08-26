import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  BackHandler,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
  bgGridTint: '#BCE7D6',
  gridLine: 'rgba(0, 0, 0, 0.08)',
  calcBgPeach: '#fbebd6', // Light cream background
  inkBlack: '#000000',
  white: '#FFFFFF',
  windowYellow: '#F3E99E',
  windowPurple: '#CBB6FF',
  windowMint: '#86E3CE',
  accentGreen: '#00C897',
  accentPurple: '#A06EE1',
};

type TabType = 'gears' | 'ohms' | 'resistor';

// --- RETRO GRID BACKGROUND (ONLY FOR SELECTION SCREEN) ---
const RetroGridBackground = () => (
  <View style={StyleSheet.absoluteFill}>
    <View style={styles.gridContainer}>
      {Array.from({ length: 45 }).map((_, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.gridRow}>
          {Array.from({ length: 20 }).map((_, colIndex) => (
            <View key={`col-${colIndex}`} style={styles.gridSquare} />
          ))}
        </View>
      ))}
    </View>
  </View>
);

export default function Calculator() {
  const [activeTab, setActiveTab] = useState<TabType | null>(null);

  // --- HARDWARE BACK BUTTON HANDLER ---
  useEffect(() => {
    const onBackPress = () => {
      if (activeTab !== null) {
        setActiveTab(null);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backHandler.remove();
  }, [activeTab]);

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
  const [bandA, setBandA] = useState<ColorOption>(RESISTOR_COLORS[1]);
  const [bandB, setBandB] = useState<ColorOption>(RESISTOR_COLORS[7]);
  const [bandC, setBandC] = useState<ColorOption>(RESISTOR_COLORS[2]);
  const [bandD, setBandD] = useState<ColorOption>(RESISTOR_COLORS[2]);
  const [bandE, setBandE] = useState<ColorOption>(RESISTOR_COLORS[10]);
  const [pickerModal, setPickerModal] = useState<{ visible: boolean; bandKey: string }>({
    visible: false,
    bandKey: '',
  });

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

  const handleCalculateOhms = () => {
    const res = calculateOhmsLaw(ohmsMode, ohmsVal1, ohmsVal2);
    setOhmsResult(res.result);
  };

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

  const selectColorForBand = (color: ColorOption) => {
    const key = pickerModal.bandKey;
    if (key === 'A') setBandA(color);
    if (key === 'B') setBandB(color);
    if (key === 'C') setBandC(color);
    if (key === 'D') setBandD(color);
    if (key === 'E') setBandE(color);
    setPickerModal({ visible: false, bandKey: '' });
  };

  const topSafeAreaPadding = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;

  // --- SELECTION SCREEN (WITH GREEN RETRO GRID) ---
  if (!activeTab) {
    return (
      <View style={[styles.fixedSelectionContainer, { paddingTop: styles.fixedSelectionContainer.paddingTop + topSafeAreaPadding }]}>
        <RetroGridBackground />

        {/* TOP SEARCH / HEADER BAR */}
        <View style={styles.retroSearchBar}>
          <Ionicons name="search-sharp" size={18} color={COLORS.inkBlack} style={{ marginRight: 8 }} />
          <Text style={styles.retroSearchBarText}>SELECT YOUR CALCULATOR</Text>
        </View>

        {/* CARD 1: GEARS CALCULATOR */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.retroWindowCard, { backgroundColor: COLORS.windowYellow }]}
          onPress={() => setActiveTab('gears')}
        >
          <View style={styles.windowHeaderBar}>
            <View style={[styles.windowPill, { backgroundColor: COLORS.accentGreen }]} />
            <Ionicons name="close" size={16} color={COLORS.inkBlack} />
          </View>
          <View style={styles.windowBody}>
            <Text style={styles.retroCardTitle}>GEAR RATIO & RPM CALCULATOR</Text>
            <View style={styles.retroDivider} />
            <Text style={styles.retroCardBodyText}>
              COMPUTE GEAR RATIOS, OUTPUT RPM, AND TORQUE CONVERSION FOR MOTOR DRIVE TRAINS.
            </Text>
          </View>
        </TouchableOpacity>

        {/* CARD 2: OHM'S LAW */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.retroWindowCard, { backgroundColor: COLORS.windowPurple }]}
          onPress={() => setActiveTab('ohms')}
        >
          <View style={styles.windowHeaderBar}>
            <View style={[styles.windowPill, { backgroundColor: COLORS.accentPurple }]} />
            <Ionicons name="close" size={16} color={COLORS.inkBlack} />
          </View>
          <View style={styles.windowBody}>
            <Text style={styles.retroCardTitle}>OHM'S LAW SOLVER</Text>
            <View style={styles.retroDivider} />
            <Text style={styles.retroCardBodyText}>
              SOLVE VOLTAGE, CURRENT, OR RESISTANCE FOR ELECTRICAL CIRCUITS ACCURATELY.
            </Text>
          </View>
        </TouchableOpacity>

        {/* CARD 3: RESISTOR COLOR CODE */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.retroWindowCard, { backgroundColor: COLORS.windowMint }]}
          onPress={() => setActiveTab('resistor')}
        >
          <View style={styles.windowHeaderBar}>
            <View style={[styles.windowPill, { backgroundColor: COLORS.accentGreen }]} />
            <Ionicons name="close" size={16} color={COLORS.inkBlack} />
          </View>
          <View style={styles.windowBody}>
            <Text style={styles.retroCardTitle}>RESISTOR COLOR CODE</Text>
            <View style={styles.retroDivider} />
            <Text style={styles.retroCardBodyText}>
              DECODE 4-BAND AND 5-BAND RESISTOR COLOR RINGS INTO OHMIC VALUES.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // --- INNER CALCULATOR SCREENS (LIGHT CREAM BACKGROUND, NO GRID) ---
  return (
    <View style={[styles.innerContainer, { paddingTop: topSafeAreaPadding }]}>
      <ScrollView
        style={styles.mainWrapper}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerTopBar}>
          <TouchableOpacity style={styles.smallBackButton} onPress={() => setActiveTab(null)}>
            <Ionicons name="arrow-back" size={18} color={COLORS.inkBlack} />
          </TouchableOpacity>
          <Text style={styles.innerTopTitle}>
            {activeTab === 'gears' ? 'GEAR RATIO' : activeTab === 'ohms' ? "OHM'S LAW" : 'RESISTOR CODES'}
          </Text>
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
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>{getResistorResult().valueStr}</Text>
              <Text style={styles.subResultText}>Tol: {getResistorResult().toleranceStr}</Text>
            </View>

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

        {/* ==================== NUMPAD KEYBOARD ==================== */}
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
                      <Ionicons name="backspace-outline" size={20} color={COLORS.inkBlack} />
                    ) : (
                      <Text style={styles.keyText}>{key}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}

            <View style={styles.keypadRow}>
              <TouchableOpacity style={[styles.keyItem, styles.clearKey]} onPress={handleClearAll}>
                <Ionicons name="trash-outline" size={14} color={COLORS.inkBlack} style={styles.iconMargin} />
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
              <ScrollView style={{ maxHeight: 320 }}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    backgroundColor: COLORS.calcBgPeach,
  },
  mainWrapper: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 70,
  },

  /* PURE RN RETRO GRID */
  gridContainer: {
    flex: 1,
    backgroundColor: COLORS.bgGridTint,
    flexDirection: 'column',
  },
  gridRow: {
    flexDirection: 'row',
  },
  gridSquare: {
    width: 32,
    height: 32,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.gridLine,
  },

  /* SELECTION CONTAINER */
  fixedSelectionContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    justifyContent: 'flex-start',
  },

  /* RETRO SEARCH BAR ON TOP */
  retroSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: COLORS.inkBlack,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  retroSearchBarText: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.inkBlack,
    letterSpacing: 1,
  },

  /* RETRO WINDOW CARDS */
  retroWindowCard: {
    borderRadius: 18,
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: COLORS.inkBlack,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  windowHeaderBar: {
    height: 34,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2.5,
    borderColor: COLORS.inkBlack,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  windowPill: {
    width: 60,
    height: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.inkBlack,
  },
  windowBody: {
    padding: 16,
    backgroundColor: COLORS.white,
    margin: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.inkBlack,
  },
  retroCardTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.inkBlack,
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  retroDivider: {
    height: 3,
    width: 24,
    backgroundColor: COLORS.inkBlack,
    marginVertical: 10,
    borderRadius: 2,
  },
  retroCardBodyText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.inkBlack,
    lineHeight: 16,
    letterSpacing: 0.3,
  },

  /* INNER BACK BAR */
  innerTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  smallBackButton: {
    width: 36,
    height: 36,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: COLORS.inkBlack,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  innerTopTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.inkBlack,
    letterSpacing: 0.5,
  },

  /* CALCULATOR INTERNAL STYLES */
  resultBox: {
    backgroundColor: COLORS.windowYellow,
    minHeight: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    shadowColor: COLORS.inkBlack,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    marginBottom: 16,
  },
  resultText: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.inkBlack,
  },
  subResultText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.inkBlack,
    marginTop: 2,
  },

  heading: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.inkBlack,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  input: {
    width: '48%',
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '800',
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
    marginTop: 2,
    marginBottom: 16,
  },
  calcButton: {
    width: '31%',
    backgroundColor: COLORS.windowMint,
    paddingVertical: 10,
    borderRadius: 12,
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
    paddingVertical: 8,
    borderRadius: 12,
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
    backgroundColor: COLORS.windowPurple,
  },
  calcButtonText: {
    color: COLORS.inkBlack,
    fontWeight: '900',
    fontSize: 12,
  },

  fullWidthActionBtn: {
    width: '100%',
    height: 44,
    backgroundColor: COLORS.windowMint,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    shadowColor: COLORS.inkBlack,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    marginBottom: 16,
  },

  /* RESISTOR VISUAL GRAPHIC */
  resistorCanvas: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  resistorWire: {
    height: 5,
    width: 24,
    backgroundColor: COLORS.inkBlack,
  },
  resistorBody: {
    width: 160,
    height: 38,
    backgroundColor: '#D1D5DB',
    borderRadius: 8,
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  bandGraphic: {
    width: 10,
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
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    shadowColor: COLORS.inkBlack,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    marginBottom: 8,
  },
  dropdownLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.inkBlack,
  },
  colorBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorPreview: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: COLORS.inkBlack,
    marginRight: 6,
  },
  dropdownValue: {
    fontSize: 12,
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
    backgroundColor: COLORS.calcBgPeach,
    borderRadius: 16,
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    padding: 14,
  },
  modalColorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.inkBlack,
    marginBottom: 6,
  },
  modalColorText: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.inkBlack,
  },

  /* NUMPAD KEYBOARD STYLES */
  keypadContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 2.5,
    borderColor: COLORS.inkBlack,
    borderRadius: 18,
    padding: 10,
    marginTop: 4,
    shadowColor: COLORS.inkBlack,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  keyItem: {
    width: '31%',
    height: 46,
    backgroundColor: COLORS.white,
    borderRadius: 10,
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
    backgroundColor: '#FCA5A5',
  },
  clearKey: {
    width: '100%',
    height: 42,
    backgroundColor: COLORS.windowPurple,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.inkBlack,
  },
  clearKeyText: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.inkBlack,
    letterSpacing: 0.8,
  },
  iconMargin: {
    marginRight: 6,
  },
});