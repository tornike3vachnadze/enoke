// @ts-nocheck
import { Canvas, useFrame, useLoader } from '@react-three/fiber/native';
import { useState, useRef, Suspense } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useAnimatedSensor, SensorType } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

function ObjectViewer({ animatedSensor, objectURI }) {
  const obj = useLoader(OBJLoader, objectURI);
  const mesh = useRef();

  useFrame((state, delta) => {
    let { x, y, z } = animatedSensor.sensor.value;
    x = ~~(x * 100) / 5000;
    y = ~~(y * 100) / 5000;
    mesh.current.rotation.x += x;
    mesh.current.rotation.y += y;
  });

  return (
    <mesh ref={mesh}>
      <primitive object={obj} scale={0.5} />
    </mesh>
  );
}

export default function CADViewer({ uri }: { uri: string }) {
  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 100,
  });

  return (
    <View style={styles.container}>
      <Canvas>
        <pointLight position={[100, 1, 10]} />
        <pointLight position={[-100, 1, 10]} />

        <Suspense fallback={null}>
          <ObjectViewer animatedSensor={animatedSensor} objectURI={uri} />
        </Suspense>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    height: height * 0.8,
    backgroundColor: 'aliceblue',
    zIndex: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
});
