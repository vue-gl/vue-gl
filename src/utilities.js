export function superMethod(component, name) {
  if (name in component.methods) return component.methods[name];
  if ('extends' in component) return superMethod(component.extends, name);
  return () => {};
}

export function dummy() {}
